const express = require('express');
const { Admin, validate } = require('../../models/admin');
const { User} = require('../../models/user');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const helper = require('../../services/helper');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

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

        
        const token = user.generateAuthToken(payload);

        payload.token = 'Bearer ' + token;

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

exports.adminAuthRegister = async (userDetails, role, res) => {

    try {
        const { error } = validate(userDetails);
        const errors = {};
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = (err.message).replace(/"/g, "");
            }
        }

        if (error) return res.status(422).json(errors);

        const admin = new Admin({
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password
        })

       /* const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(userDetails.password, salt);*/

        admin.save();

        let payload = _.pick(admin, ['_id', 'name', 'email']);

        const token = admin.generateAuthToken(payload);

        const response = { success: true, admin: payload, token: 'Bearer ' + token, role }

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

exports.getAllUser = async (req, res) => {
    try {
        User.find().select({ "password": 0 }).then(
            user => {
                if (!user) {
                    return res.status(404).json(errors);
                }
                return res.json({ user });
            }

        )


    } catch (err) { }
};

exports.addUser = async (req, res) => {

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