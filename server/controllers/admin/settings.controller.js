const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { Setting } = require('../../models/setting');
const _ = require('lodash');
var db = require('../../services/model.js');
var helper = require('../../services/helper');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

exports.getSetting = async (req, res) => {

    try {

        let settings = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });

        const data = settings;

        const response = helper.response({ data });
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

exports.updateGeneral = async (req, res) => {
    
    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Title"),
        /* description: Joi.string().required().label("Description"),
        mobile: Joi.string().required().label("Mobile"),
        email: Joi.string().required().label("Email"),
        copyright: Joi.string().required().label("Copyright") */
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
        const data = {
            title: req.body.title,
            description: req.body.description,
            mobile: req.body.mobile,
            email: req.body.email,
            copyright: req.body.copyright
        }

        var setting = await Setting.findOne();

        if(req.files['logo']) setting.site.logo = req.protocol+ '://' +req.get('host')+"/images/common/" + req.files['logo'][0].filename;
        if(req.files['favicon']) setting.site.favicon = req.protocol+ '://' +req.get('host')+"/images/common/" + req.files['favicon'][0].filename;

        setting.site.title =  req.body.title,
        setting.site.description =  req.body.description,
        setting.site.mobile =  req.body.mobile,
        setting.site.email =  req.body.email,
        setting.site.copyright =  req.body.copyright

        const site = await Setting.updateOne({}, setting, { new: true })

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
