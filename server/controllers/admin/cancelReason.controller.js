const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { CancelReason } = require('../../models/CancelReason');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const db = require('../../services/model.js');
const helper = require('../../services/helper');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

exports.listCancelReason = async (req, res) => {
    try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;

        let CancelReasons = await db._get(CancelReason, null, null, {limit: req.query.length, skip: skip });

        let count = await db._count(CancelReason);

        const data = { CancelReasons };

        //const response = helper.response({ data });

        const response = helper.response({ data: helper.paginate(req, data, count) });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.createCancelReason = async (req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        reason: Joi.string().required().label("Reason"),
        type: Joi.string().required().label("type")
        
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
        const cancel_reason = {
            reason: req.body.reason,
            type: req.body.type
        }

        let CancelReasons = await db._store(CancelReason, cancel_reason);

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
exports.deleteCancelReason = async (req, res) => {
    try {
        let CancelReasons = await db._delete(CancelReason, {"_id":req.params.id});

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

exports.updateCancelReason = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("Cancel Reason Id"),
        reason: Joi.string().required().label("Reason"),
        type: Joi.string().required().label("type")
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
        const cancel_reason = {
                reason: req.body.reason,
                type: req.body.type
        }

        let CancelReasons = await db._update(CancelReason, { _id: req.body.id }, cancel_reason);

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
exports.listCancelReasonbyid = async (req, res) => {
    try {

        let cancel_reason = await db._find(CancelReason, {"_id":req.params.id});

        const data = { cancel_reason };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.changeStatus = async (req, res) => {
    try {
        const cancel_reason = {
                status: req.params.status,
        }

        let cancel_reasons = await db._update(CancelReason, { _id: req.params.id }, cancel_reason);

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