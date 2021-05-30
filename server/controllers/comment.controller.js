const express = require("express");
const { Setting } = require('./../models/setting');
const { Comment } = require('./../models/Comment');
const helper = require('../services/helper.js');
const { User } = require('../models/user');
const db = require('../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;
const { Admin } = require('../models/admin');


exports.createComment = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        comments: Joi.string().required().label("Comment")
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

        
        let data = {
                comments: req.body.comments,
                user: req.user._id
            }

        let comment = await db._store(Comment, data);

        let comments = await db._get(Comment, {status: true}, null, {populate: "user"});

        const response = helper.response({ message: res.__('created'), data: comments });
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

exports.getComment = async (req, res) => {

    const errors = {};
    try {

        let comment = await db._get(Comment, {status: true}, null, {populate: "user"});
        const data = { comment };
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