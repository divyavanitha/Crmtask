const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { Slide } = require('../../models/Slide');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });
var db = require('../../services/model.js');
var helper = require('../../services/helper');

exports.createSlide = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Title"),
        category: Joi.string().required().label("Category")
        
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
        const slide = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description
        }
         slide.layoutPhoto = req.protocol+ '://' +req.get('host')+"/images/slide/"+(req.files.layoutPhoto[0].filename);
        let slides = await db._store(Slide, slide);

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


exports.updateSlide = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Title"),
        category: Joi.string().required().label("Category"),
        id: Joi.string().required().label("Slide Id")
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
        const slide = {
            title: req.body.title,
            category: req.body.category
        }
        slide.layoutPhoto = req.protocol+ '://' +req.get('host')+"/images/slide/"+(req.files.layoutPhoto[0].filename);
        let slides = await db._update(Slide, { _id: req.body.id }, slide);

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

exports.deleteSlide = async (req, res) => {
   try {
        await db._delete(Slide, {"_id":req.params.id});

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
exports.listSlide = async (req, res) => {

    try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;
        
        let slides = await db._get(Slide, null, null, {limit: req.query.length, skip: skip});
        let count = await db._count(Slide);
        const data = { slides };

        const response = helper.response({ data: helper.paginate(req, data, count) });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.listSlidebyid = async (req, res) => {
    try {

        let slide = await db._find(Slide, {_id:req.params.id});

        const data = { slide };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.changeStatus = async (req, res) => {
    try {
        const slide = {
                status: req.params.status,
        }

        let slides = await db._update(Slide, { _id: req.params.id }, slide);

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