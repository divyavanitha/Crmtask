const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { User } = require('../../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
var db = require('../../services/model.js');
var helper = require('../../services/helper');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

exports.listusers = async (req, res) => {
    try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;

        let users = await db._get(User, null, null, {limit: req.query.length, skip: skip });

        let count = await db._count(User);

        const data = { users };

        //const response = helper.response({ data });

        const response = helper.response({ data: helper.paginate(req, data, count) });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.createuser = async (req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        first_name: Joi.string().required().label("First Name"),
        last_name: Joi.string().required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        mobile: Joi.number().min(10).integer().required().label("Mobile"),
        password: Joi.string().required().min(6).label("Password"),
        confirm_password: Joi.any().equal(Joi.ref('password')).required().label("Confirm Password")
        
    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const response = helper.response({ status: 422, error:errorMessage });

    if (error) return res.status(response.statusCode).json(response);

    try {
        let email = await User.findOne({ email: req.body.email });
        if (email) return res.status(422).json( helper.response(  { status: 422, message: 'Email already exists'  }   ));

        let mobile = await User.findOne({ mobile: req.body.mobile });
        if (mobile) return res.status(422).json( helper.response(  { status: 422, message: 'Mobile already exists'  }   ));

        const user = new User({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            referralId: Math.random().toString(36).slice(2)
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
       

        let users = await db._store(User, user);

        const response = helper.response({ message: res.__('inserted') });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                return res.status(422).json(err.errors[i].message);
            }
        } else {
            return res.status(422).json(err);
        }
    }

};
exports.deleteuser = async (req, res) => {
    try {
        let users = await db._delete(User, {"_id":req.params.id});

        const response = helper.response({ message: res.__('deleted') });
        return res.status(response.statusCode).json(response);
        
    }
    catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(422).send(err);
        }
    }

};

exports.updateuser = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        first_name: Joi.string().required().label("First Name"),
        last_name: Joi.string().required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        mobile: Joi.number().min(10).integer().required().label("Mobile"),
        password: Joi.string().required().min(6).label("Password"),
        confirm_password: Joi.any().equal(Joi.ref('password')).required().label("Confirm Password")
    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const response = helper.response({ status: 422, error:errorMessage });

    if (error) return res.status(response.statusCode).json(response);

    try {
        const user = new User({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            referralId: Math.random().toString(36).slice(2)
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        let users = await db._update(User, { _id: req.body.id }, user);

        const response = helper.response({ message: res.__('updated') });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                return res.status(422).json(err.errors[i].message);
            }
        } else {
            return res.status(422).json(err);
        }
    }
}
exports.listuserbyid = async (req, res) => {
    try {

        let user = await db._find(User, {"_id":req.params.id});

        const data = { user };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.changeStatus = async (req, res) => {
    try {
        const user = {
                status: req.params.status,
        }

        let users = await db._update(User, { _id: req.params.id }, user);

        const response = helper.response({ message: res.__('updated') });
        return res.status(response.statusCode).json(response);
        
    }
    catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(422).send(err);
        }
    }

};