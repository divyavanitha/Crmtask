
const { Setting } = require('./../models/setting');

const Joi = require('@hapi/joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const transporter = require('../config/mail');
const dotenv = require('dotenv');
var helper = require('../services/helper.js');
var db = require('../services/model.js');
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
