const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { Menu } = require('../../models/Menu');
const _ = require('lodash');
const db = require('../../services/model.js');
const helper = require('../../services/helper');
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

        menu.layoutPhoto = req.protocol+ '://' +req.get('host')+"/images/menu/"+(req.files.layoutPhoto[0].filename);

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
        menu.layoutPhoto = req.protocol+ '://' +req.get('host')+"/images/menu/"+(req.files.layoutPhoto[0].filename);

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
        let menus = await db._get(Menu, {}, {}, {populate: "category"});
        const data = { menus };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}
exports.listSubCategorybyid = async (req, res) => {
    try {
    const errors = {};
    SubCategory.findOne({id: req.params.id})
    .then(subcategory => {
        if (!subcategory) {
            errors.noSubCategory = 'There are no SubCategory';
            return res.status(404).json(errors);
        }

        res.json({subcategory});
    })
    }    catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(422).send(err);
        }
    }

}