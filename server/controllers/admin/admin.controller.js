const express = require('express');
const { Admin, validate } = require('../../models/admin');
const { User} = require('../../models/user');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const helper = require('../../services/helper');
const db = require('../../services/model.js');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });
const adminTokenList = {};

exports.adminAuth = async (req, res) => {

    try {
      
        const schema = Joi.object().options({ abortEarly: false }).keys({
            email: Joi.string().required().label("Email"),
            password: Joi.string().required().min(6).label("Password")
        });

        const { error } = schema.validate(req.body);
        const errors = { };
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = (err.message).replace(/"/g, "");
            }
        }

        if (error) res.status(422).json( helper.response(  { status: 422, error : errors }   ));

        let user = await Admin.findOne({ email: req.body.email });
        if (!user) res.status(422).json( helper.response(  { status: 422, error : { message: 'Invalid credentials' } }   ));

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) res.status(422).json( helper.response(  { status: 422, error : { message: 'Invalid credentials' } }   ));

        let payload = _.pick(user, ['_id', 'name', 'email']);

        /*let roleList = _.map(payload.roles, 'role');
        let role = _.map(roleList, 'name');
        
        payload.roles = role;*/
        
        const token = user.generateAuthToken(payload);
        const refreshToken = user.generateRefreshToken(payload);

        payload.token = 'Bearer ' + token;
        adminTokenList[refreshToken] = payload;

        payload.refreshToken =  refreshToken;

        const data = { user: payload };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(422).send(err);
        }
    }

};

exports.adminAuthRegister = async (req, res) => {

    try {
        const { error } = validate(req.body);
        const errors = {};
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = (err.message).replace(/"/g, "");
            }
        }

        if (error) return res.status(422).json(errors);

        const admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        admin.save();

        let payload = _.pick(admin, ['_id', 'name', 'email', 'role']);

        const token = admin.generateAuthToken(payload);

        const response = { success: true, admin: payload, token: 'Bearer ' + token }

        res.send(response);

    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(500).send({ error: err.name });
        }
    }

};



exports.getAdministrators = async (req, res) => {
    try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;

        let users = await db._get(Admin, null, {'name': 1, 'email': 1, 'role': 1 }, {limit: req.query.length, skip: skip });

        let count = await db._count(Admin);

        const data = { users };

        //const response = helper.response({ data });

        const response = helper.response({ data: helper.paginate(req, data, count) });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }
      
};




exports.refresh = async (req, res) => {

    try {

        let refresh_token = req.body.refresh_token;

        if( refresh_token && (refresh_token in adminTokenList)) {
            let user = await Admin.findOne({ email: adminTokenList[refresh_token]['email'] });

            let payload = _.pick(user, ['_id', 'name', 'email', 'roles']);

            l/*et roleList = _.map(payload.roles, 'role');
            let role = _.map(roleList, 'name');
            
            payload.roles = role;*/

            const token = user.generateAuthToken(payload);
            const refreshToken = user.generateRefreshToken(payload);

            payload.token = 'Bearer ' + token;
            adminTokenList[refreshToken] = payload;

            payload.refreshToken =  refreshToken;

            const data = { user: payload };

            const response = helper.response({ data });
            return res.status(response.statusCode).json(response);

        } else {
            return res.status(401).json({
                "statusCode": 401,
                "title": "Unauthorised",
                "message": "Unauthorised",
                "data": {},
                "error": {}
            });
        }

    } catch (err) {
        
        return res.status(401).json({
            "statusCode": 401,
            "title": "Unauthorised",
            "message": "Unauthorised",
            "data": {},
            "error": {}
        });
    }

};


exports.addAdministrator = async (req, res) => {

    try {
       // const { error } = validate(req.body);
        /* const errors = {};
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = (err.message).replace(/"/g, "");
            }
        }
        if (error) return res.status(422).json(errors); */

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        let verify = Math.floor((Math.random() * 10000000) + 1);
        await user.save(function (error, user) {
            res.send("Inserted sucessfully");
 
        })

    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(500).send({ error: err.name });
        }
    }
};


exports.getCount = async (req, res) => {
    try {
        let totalusers = await User.count({ status: true });

        res.send({ totalusers });
    } catch (err) { }
};