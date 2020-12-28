const express = require("express");
const { Request } = require("../../models/Request");
const { requestOffer } = require('../../models/requestOffer');
const helper = require('../../services/helper.js');
const db = require('../../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');


exports.listRequests = async (req, res) => {


    try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;

        let count, requests;
        let active_count = await db._count(Request, {status: "APPROVE"});
        let pending_count = await db._count(Request, {status: "PENDING"});
        let paused_count = await db._count(Request, {status: "PAUSE"});
        let declined_count = await db._count(Request, {status: "DECLINE"});
        let all_count = await db._count(Request);

        if((req.query.type).toUpperCase() == "APPROVE"){
            requests = await db._get(Request, {status: "APPROVE"}, {}, {populate: ["category", "user"]});
            count = active_count;
        }else if((req.query.type).toUpperCase() == "PENDING"){
            requests = await db._get(Request, {status: "PENDING"}, {}, {populate: ["category", "user"]});
            count = pending_count;
        }else if((req.query.type).toUpperCase() == "PAUSE"){
            requests = await db._get(Request, {status: "PAUSE"}, {}, {populate: ["category", "user"]});
            count = paused_count;
        }else if((req.query.type).toUpperCase() == "DECLINE"){
            requests = await db._get(Request, {status: "DECLINE"}, {}, {populate: ["category", "user"]});
            count = declined_count;
        }else{
            requests = await db._get(Request, {}, {} , {populate: ["category", "user"]});
            count = all_count;
        }

        const data = { requests };
        const response = helper.response({ data:  { requests : helper.paginate(req, data, count), active_count: active_count, pending_count: pending_count, paused_count: paused_count, declined_count: declined_count, all_count: all_count }  });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
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