
const { Setting } = require('./../models/setting');

const Joi = require('@hapi/joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const transporter = require('../config/mail');
const dotenv = require('dotenv');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
dotenv.config({ path: __dirname + '/../../.env' });

exports.settings = async (req, res) => {
    try {

        let settings = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });

        const data = settings;

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }
};

exports.sendSms = async (req, res) => {

    try {

        const response = await helper.sendSms({ number: req.body.mobile, message: req.body.message });
        return res.json(response);

    } catch (err) {
        console.log(err);
       return res.status(500).json({status: 500});
    }
};

exports.sendMail = async (req, res) => {
    try {

        const response = await helper.sendMail({to: req.body.to, subject: req.body.subject, message: req.body.message});
        return res.json(response);

    } catch (err) {
        console.log(err);
         return res.status(500).json({status: 500});
    }
};
