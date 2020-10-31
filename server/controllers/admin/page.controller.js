const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { Page } = require('../../models/page');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });
const db = require('../../services/model.js');
const helper = require('../../services/helper');


exports.createpage = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Title"),
        content: Joi.string().required().label("Content"),
        url: Joi.string().required().label("Url"),
        
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
        const page = {
            title: req.body.title,
            content: req.body.content,
            url: req.body.url,
            
        }

        let pages = await db._store(Page, page);

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
}

exports.updatePage = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Title"),
        content: Joi.string().required().label("Content"),
        url: Joi.string().required().label("Url")
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
        const page = {
                title: req.body.title,
                content: req.body.content,
                url: req.body.url,
        }

        let pages = await db._update(Page, { _id: req.body.id }, page);

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

exports.listpage = async (req, res) => {
    try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;
        let pages = await db._get(Page, null, null, {limit: req.query.length, skip: skip});
        let count = await db._count(Page);
        const data = { pages };

        const response = helper.response({ data: helper.paginate(req, data, count) });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.deletepage = async (req, res) => {

    try {
        await db._delete(Page, {"_id":req.params.id});

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


exports.listPagebyid = async (req, res) => {
    try {

        let page = await db._find(Page, {_id:req.params.id});

        const data = { page };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.changeStatus = async (req, res) => {
    try {
        const page = {
                status: req.params.status,
        }

        let pages = await db._update(Page, { _id: req.params.id }, page);

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