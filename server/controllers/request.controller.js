const express = require("express");
const { Request } = require("../models/Request");
const { requestOffer } = require('../models/requestOffer');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');


exports.listRequests = async (req, res) => {
    try {
            let active_requests = await db._get(Request, { user: req.user._id, status: "APPROVE" }, {}, {populate: "user"});
            let inactive_requests = await db._get(Request, { user: req.user._id, status: "DECLINE" }, {}, {populate: "user"});
            let pending_requests = await db._get(Request, { user: req.user._id, status: "PENDING" }, {}, {populate: "user"});
            let paused_requests = await db._get(Request, { user: req.user._id, status: "PAUSE" }, {}, {populate: "user"});

        const response = helper.response({ data: {"active": active_requests, "decline": inactive_requests, "pending": pending_requests, "paused": paused_requests } });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.createrequest = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        category_id: Joi.string().required().label("Category Id"),
        sub_category_id: Joi.string().required().label("Sub Category Id"),
       // duration: Joi.string().required().label("Duration"),
        budget: Joi.string().required().label("Budget"),
        title: Joi.string().required().label("Title")
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
                description: req.body.description,
                category: req.body.category_id,
                subCategory: req.body.sub_category_id,
                duration: req.body.duration,
                budget: req.body.budget,
                status: "PENDING",
                title: req.body.title,
                user: req.user._id
            }

        if(req.files['files']) data.files = req.protocol+ '://' +req.get('host')+"/images/request/" + req.files['files'][0].filename;

        let request = await db._store(Request, data);

        const response = helper.response({ message: res.__('created'), data: request });
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

exports.deleteRequest = async (req, res) => {
    try {
        let requests = await db._delete(Request, {"_id":req.params.id});

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

exports.request_offer = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        gig_id: Joi.string().required().label("Gig Id"),
        request_id: Joi.string().required().label("Request Id")
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
                gig: req.body.gig_id,
                request: req.body.request_id
            }

        let offer = await db._store(requestOffer, data);

        const response = helper.response({ message: res.__('created'), data: offer });
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

exports.changeStatus = async (req, res) => {
    try {
        const request = {
                status: req.params.status,
        }

        let requests = await db._update(Request, { _id: req.params.id }, request);

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

exports.buyerRequest = async (req, res) => {
    try {

        let requests = await db._get(Request, { user: { $ne: req.user._id }, status: "APPROVE" }, {}, { populate: [ 
            { path: "user" },
            { path: "category", select: 'name'}, 
            { path: "subCategory", select: 'name'}
            ] });
        const response = helper.response({ data: requests});
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}
