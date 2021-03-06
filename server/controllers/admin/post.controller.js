const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { Post } = require('../../models/Post');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });
const db = require('../../services/model.js');
const helper = require('../../services/helper');

exports.createPost = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Title"),
        
    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const errorResponse = helper.response({ status: 422, error:errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {
        const post = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description
        }
        if(req.files['layoutPhoto']) post.layoutPhoto = req.protocol+ '://' +req.get('host')+"/images/post/"+(req.files.layoutPhoto[0].filename);
        let posts = await db._store(Post, post);

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


exports.updatePost = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Title"),
        id: Joi.string().required().label("Slide Id")
    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const errorResponse = helper.response({ status: 422, error:errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {
        const post = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description
        }
        if(req.files['layoutPhoto']) post.layoutPhoto = req.protocol+ '://' +req.get('host')+"/images/post/"+(req.files.layoutPhoto[0].filename);
        let posts = await db._update(Post, { _id: req.body.id }, post);

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

exports.deletePost = async (req, res) => {
   try {
        await db._delete(Post, {"_id":req.params.id});

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
exports.listPost = async (req, res) => {

    try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;
        
        let posts = await db._get(Post, null, null, {limit: req.query.length, skip: skip});
        let count = await db._count(Post);
        const data = { posts };

        const response = helper.response({ data: helper.paginate(req, data, count) });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.listPostbyid = async (req, res) => {
    try {

        let post = await db._find(Post, {_id:req.params.id});

        const data = { post };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.changeStatus = async (req, res) => {
    try {
        const post = {
                status: req.params.status,
        }

        let slides = await db._update(Post, { _id: req.params.id }, post);

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