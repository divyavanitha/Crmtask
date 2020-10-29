const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { Menu } = require('../../models/Menu');
const _ = require('lodash');
var db = require('../../services/model.js');
var helper = require('../../services/helper');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

exports.createMenu = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Tilte"),
        subTitle: Joi.string().required().label("Sub Tilte"),
        category: Joi.string().required().label("Category"),
        
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
        const menu = {
            title: req.body.title,
            subTitle: req.body.subTitle,
            category: req.body.category,   
        }

        if(req.files['layoutPhoto']) menu.layoutPhoto = req.protocol+ '://' +req.get('host')+"/images/menu/"+(req.files.layoutPhoto[0].filename);

        let lay = await db._store(Menu, menu);

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

exports.updateMenu = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Tilte"),
        subTitle: Joi.string().required().label("Sub Tilte"),
        category: Joi.string().required().label("Category"),
        id: Joi.string().required().label("Layout Id")
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
        const menu = {
            title: req.body.title,
            subTitle: req.body.subTitle,
            category: req.body.category,   
        }
        if(req.files['layoutPhoto']) menu.layoutPhoto = req.protocol+ '://' +req.get('host')+"/images/menu/"+(req.files.layoutPhoto[0].filename);

        let lay = await db._update(Menu, { _id: req.body.id }, menu);

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

exports.deleteMenu = async (req, res) => {
    try {
        await db._delete(Menu, {"_id":req.params.id});

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
exports.listMenu = async (req, res) => {
     try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;
        let menus = await db._get(Menu, null, null, {limit: req.query.length, skip: skip, populate: "category"});
        let count = await db._count(Menu);
        const data = { menus };

        const response = helper.response({ data: helper.paginate(req, data, count) });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}
exports.listMenubyid = async (req, res) => {
    try {

        let menu = await db._find(Menu, {_id:req.params.id});

        const data = { menu };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.changeStatus = async (req, res) => {
    try {
        const menu = {
                status: req.params.status,
        }

        let menus = await db._update(Menu, { _id: req.params.id }, menu);

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