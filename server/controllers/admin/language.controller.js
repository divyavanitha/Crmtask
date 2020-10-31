const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { Language } = require('../../models/language');
const _ = require('lodash');
const db = require('../../services/model.js');
const helper = require('../../services/helper');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

exports.createLanguage = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required().label("Name")
        
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
        const language = {
            name: req.body.name  
        }

        let sub = await db._store(Language, language);

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

exports.updateLanguage = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required().label("Name"),
        id: Joi.string().required().label("Language Id")
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
        const language = {
            name: req.body.name 
        }

        let sub = await db._update(Language, { _id: req.body.id }, language);

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

exports.deleteLanguage = async (req, res) => {
    try {
        await db._delete(Language, {"_id":req.params.id});

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
exports.listLanguage = async (req, res) => {
     try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;

        let languages = await db._get(Language, null, null, {limit: req.query.length, skip: skip});
        let count = await db._count(Language);
        const data = { languages };

        const response = helper.response({ data: helper.paginate(req, data, count) });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}
exports.listLanguagebyid = async (req, res) => {
    try {

        let language = await db._find(Language, {_id:req.params.id});

        const data = { language };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.changeStatus = async (req, res) => {
    try {
        const language = {
                status: req.params.status,
        }

        let languages = await db._update(Language, { _id: req.params.id }, language);

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