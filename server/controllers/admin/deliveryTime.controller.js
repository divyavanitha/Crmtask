const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { DeliveryTime } = require('../../models/DeliveryTime');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const db = require('../../services/model.js');
const helper = require('../../services/helper');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

exports.createDeliveryTime = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required().label("Name"),
        
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
        const delivery_time = {
            name: req.body.name   
        }

        let deliveryTime= await db._store(DeliveryTime, delivery_time);

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
exports.deleteDeliveryTime = async (req, res) => {
     try {
        await db._delete(DeliveryTime, {"_id":req.params.id});

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

exports.updateDeliveryTime = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required().label("Name"),
        id: Joi.string().required().label("Delivery Id")
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
        const delivery_time = {
            name: req.body.name   
        }

        let deliveryTime = await db._update(DeliveryTime, { _id: req.body.id }, delivery_time);

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

exports.listDeliveryTime = async (req, res) => {
    try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;

        let deliveryTime = await db._get(DeliveryTime, null, null, {limit: req.query.length, skip: skip});
        let count = await db._count(DeliveryTime);
        const data = { deliveryTime };

        const response = helper.response({ data: helper.paginate(req, data, count) });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}
exports.listDeliveryTimebyid = async (req, res) => {
    try {

        let delivery_time = await db._find(DeliveryTime, {_id:req.params.id});

        const data = { delivery_time };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.changeStatus = async (req, res) => {
    try {
        const delivery_time = {
                status: req.params.status,
        }

        let delivery_times = await db._update(DeliveryTime, { _id: req.params.id }, delivery_time);

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