const express = require("express");
const { Request } = require("../models/Request");
const { RequestOffer } = require('../models/RequestOffer');
const { Setting } = require('./../models/setting');
const helper = require('../services/helper.js');
const { User } = require('../models/user');
const db = require('../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const { Order } = require('../models/Order');

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


        let setting = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });
        
        if(setting.application.manualBuyerRequestApproval == false){
           var status = "APPROVE"; 
        }else{
           var status = "PENDING";
        }
        
        let data = {
                description: req.body.description,
                category: req.body.category_id,
                subCategory: req.body.sub_category_id,
                duration: req.body.duration,
                budget: req.body.budget,
                status: status,
                title: req.body.title,
                user: req.user._id
            }


            await db._update(Gig, { _id: req.body.id }, data);

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
        request_id: Joi.string().required().label("Request Id"),
        description: Joi.string().required().label("Description"),
        amount: Joi.number().required().label("Amount"),
        delivery_time: Joi.string().required().label("Delivery Time")
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
        let requests = await db._find(Request, {"_id":req.body.request_id});

        let data = {
                gig: req.body.gig_id,
                request: req.body.request_id,
                seller: req.user._id,
                description: req.body.description,
                duration: req.body.delivery_time,
                amount: req.body.amount
            }

        requests.offerCount += 1;  

        let offer = await db._store(RequestOffer, data);
        await db._update(Request, requests);

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

exports.sentOffer = async (req, res) => {
    try {

        let offers = await db._get(RequestOffer, { seller: req.user._id }, {}, { populate: [ 
            { path: "request", populate: { path: 'user', model: 'users', select: ['_id','firstName'] } }, 
            { path: "request", populate: { path: 'category', model: 'category', select: ['_id','name'] } },
            { path: "request", populate: { path: 'subCategory', model: 'SubCategory', select: ['_id','name'] } },
            { path: "gig", select: "title"} 
            ] });
        const response = helper.response({ data: offers});
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.viewOffer = async (req, res) => {
    try {

        let offers = await db._get(RequestOffer, { request: req.params.id }, {}, {populate: [{path: "seller", select: ["firstName", "profilePhoto"]}, 
            {path: "gig", select: ["_id","title", "photo"]}]});
        let request = await db._find(Request, { _id: req.params.id }, {}, { populate: [ 
            { path: "user" },
            { path: "category", select: 'name'}, 
            { path: "subCategory", select: 'name'}
            ] });

        const data = { offers, request };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.orderOffer = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        gig_id: Joi.string().required().label("Gig Id"),
        amount: Joi.number().required().label("Amount"),
        duration: Joi.string().required().label("Duration"),
        wallet: Joi.boolean().required().label("wallet"),
        payment_mode: Joi.string().required().label("Payment Mode"),
        seller: Joi.string().required().label("Seller Id"),
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

        let orderId = 'FIV' + Math.floor(100000 + Math.random() * 900000);

        let setting = await db._find(Setting, {}, { createdAt: 0, updatedAt: 0 });

        let user = await User.findById(req.body.seller);

        if ((setting.seller.levelTwoRating == user.ratingPercent) && (setting.seller.levelTwoCompletedOrder == user.completedOrder)) {
            var commission = ((req.body.amount * setting.pricing.commissionLevelTwo) / 100);
        }
        if ((setting.seller.levelOneRating == user.ratingPercent) && (setting.seller.levelOneCompletedOrder == user.completedOrder)) {
            
            var commission = ((req.body.amount * setting.pricing.commissionLevelOne) / 100);

        }
        if ((setting.seller.topRatedRating == user.ratingPercent) && (setting.seller.topRatedCompletedOrder == user.completedOrder)) {
            var commission = ((req.body.amount * setting.pricing.commissionTopRated) / 100);
        }
        if (user.type == "NEWSELLER") {
            var commission = ((req.body.amount * setting.pricing.commission) / 100);
        }

                var order = {
                    orderId: orderId,
                    wallet: req.body.wallet,
                    payment_mode: req.body.payment_mode,
                    buyer: req.user._id,
                    seller: req.body.seller,
                    gig: req.body.gig_id,
                    quantity: 1,
                    price: req.body.amount,
                    total: req.body.amount,
                    commission: commission,
                    status: "PROGRESS",
                    deliveryTime: req.body.duration,
                    revisions: 0
                }

                await db._store(Order, order);
            

        const response = helper.response({ message: res.__('created') });
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
