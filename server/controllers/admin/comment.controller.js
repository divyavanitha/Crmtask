const express = require("express");
const { Comment } = require("../../models/Comment");
const { Admin } = require('../../models/admin');
const helper = require('../../services/helper.js');
const { User } = require('../../models/user');
const db = require('../../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId; 

exports.listComments = async (req, res) => {


    try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;

    
        let comments = await db._get(Comment, {}, {} , {populate: "user"});
        let count = await db._count(Comment);
    
        const data = { comments };
        const response = helper.response({ data:  { comments : helper.paginate(req, data, count) }  });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.changeStatus = async (req, res) => {
    try {
        const comment = {
                status: req.params.status,
        }

        let users = await db._update(Comment, { _id: req.params.id }, comment);

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