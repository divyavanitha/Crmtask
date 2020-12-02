
const { Setting } = require('./../models/setting');
const { Order } = require('../models/Order');
const { Rating } = require('../models/Rating');
const { DeliveryStatus } = require('../models/DeliveryStatus');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
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

exports.buyerOrderList = async (req, res) => {
    try {

        let orders = await db._get(Order, {buyer: req.user._id}, {}, {populate: "gig"});

        let delivered_order = await db._get(Order, {buyer: req.user._id, status: "Delivered"}, {}, {populate: "gig"});

        let completed_order = await db._get(Order, {buyer: req.user._id, status: "Completed"}, {}, {populate: "gig"});

        let cancelled_order = await db._get(Order, {buyer: req.user._id, status: "Cancelled"}, {}, {populate: "gig"});

        let active_order = await db._get(Order, {buyer: req.user._id, status:  {$in : ["Progress", "Cancellation Requested", "Revision Requested", "Delivered"]}  }, {}, {populate: "gig"});

        const response = helper.response({ data: {"orders": orders, "delivered_order": delivered_order, "completed_order": completed_order, "cancelled_order": cancelled_order, "active_order": active_order } });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.buyerOrderDetails = async (req, res) => {
    try {

        let gig = await db._find(Order, {_id: req.params.id}, {}, { populate: ["gig","seller","buyer"] });


        const data = { gig };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.sellerOrderList = async (req, res) => {
    try {

        let orders = await db._get(Order, {seller: req.user._id}, {}, {populate: "gig"});

        let delivered_order = await db._get(Order, {seller: req.user._id, status: "Delivered"}, {}, {populate: "gig"});

        let completed_order = await db._get(Order, {seller: req.user._id, status: "Completed"}, {}, {populate: "gig"});

        let cancelled_order = await db._get(Order, {seller: req.user._id, status: "Cancelled"}, {}, {populate: "gig"});

        let active_order = await db._get(Order, {seller: req.user._id, status:  {$in : ["Progress", "Cancellation Requested", "Revision Requested", "Delivered"]} }, {}, {populate: "gig"});

        const response = helper.response({ data: {"orders": orders, "delivered_order": delivered_order, "completed_order": completed_order, "cancelled_order": cancelled_order, "active_order": active_order } });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.sellerOrderDetails = async (req, res) => {
    try {

        let order = await db._find(Order, {_id: req.params.id}, {}, { populate: ["gig","buyer","seller"] });


        const data = { order };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.deliveryStatus = async (req, res) => {
    try {

        let delivery_status = await db._get(DeliveryStatus, {order: req.params.id});

        const data = { delivery_status };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}