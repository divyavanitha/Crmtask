const express = require("express");
const { Request } = require("../models/Request");
const { RequestOffer } = require('../models/RequestOffer');
const { Setting } = require('./../models/setting');
const helper = require('../services/helper.js');
const { User } = require('../models/user');
const { Gig } = require('../models/gigs');
const db = require('../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const { Order } = require('../models/Order');
const ObjectId = require('mongoose').Types.ObjectId;
const { PaymentLog } = require('../models/PaymentLog');
const { Message } = require('../models/Message');
const { Conversation } = require('../models/Conversation');
const { Admin } = require('../models/admin');
const { Card } = require('../models/Card');
const Stripe = require('stripe');
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

    /*const response = helper.response({ status: 422, error:errorMessage });

    if (error) return res.status(response.statusCode).json(response);

    try {*/


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


        if(req.files['files']) data.files = req.protocol+ '://' +req.get('host')+"/images/request/" + req.files['files'][0].filename;

        let request = await db._store(Request, data);

        const response = helper.response({ message: res.__('created'), data: request });
        return res.status(response.statusCode).json(response);

   /* } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                return res.status(422).json(err.errors[i].message);
            }
        } else {
            return res.status(422).json(err);
        }
    }*/

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

        let gigs = await db._get(Gig, { user: req.user._id }, { subCategory : 1 }, { populate: [ 
            { path: "subCategory", select: 'name'}
            ] });

        let subCategory = [];

        for (let gig of gigs) {
            if(gig.subCategory)
            subCategory.push(gig.subCategory._id);
        }
console.log(subCategory);
        const requests = await Request.aggregate([

            { "$match": { status: "APPROVE", user: { $ne: new ObjectId(req.user._id) }, subCategory: { $in: subCategory }} },
            {
                "$lookup": {
                    "from": "users",
                    "let": { "id": "$user" },
                    "pipeline": [
                        {
                            "$match": {
                                "$expr": {
                                   
                                    "$eq": [
                                        "$$id",
                                        "$_id"
                                    ]
                                        
                                }

                            },

                        },
                        {"$project": {"firstName" : 1}}
                    ],
                    "as": "user"
                }
            },  
            {
                "$lookup": {
                    "from": "categories",
                    "let": { "id": "$category" },
                    "pipeline": [
                        {

                            "$match": {
                                "$expr": {
                                   
                                    "$eq": [
                                        "$$id",
                                        "$_id"
                                    ]
                                        
                                }

                            },

                        },
                        {"$project": {"name" : 1}}
                    ],
                    "as": "category"
                }
            },
            {
                "$lookup": {
                    "from": "subcategories",
                    "let": { "id": "$subCategory" },
                    "pipeline": [
                        {

                            "$match": {
                                "$expr": {
                                   
                                    "$eq": [
                                        "$$id",
                                        "$_id"
                                    ]
                                        
                                }

                            },

                        },
                        {"$project": {"name" : 1}}
                    ],
                    "as": "subCategory"
                }
            },
            {
                "$lookup": {
                    "from": "requestoffers",
                    "let": { "id": "$_id" },
                    "pipeline": [
                        {

                            "$match": {
                                "$expr": {
                                    "$and": [
                                        { "$eq": ["$seller", new ObjectId(req.user._id)] },
                                        {
                                            "$eq": [
                                                "$$id",
                                                "$request"
                                            ]
                                        }]
                                }

                            },

                        },
                    ],
                    "as": "requestoffers"
                }
            },
            { $unwind : "$user" },
            { $unwind : "$category" },
            { $unwind : "$subCategory" },
            { $match: { "requestoffers": { $eq: [] } } }
        ])

        const response = helper.response({ data : requests });
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

    /*const response = helper.response({ status: 422, error:errorMessage });

    if (error) return res.status(response.statusCode).json(response);

    try {
*/
        let orderId = 'FIV' + Math.floor(100000 + Math.random() * 900000);

        let user = await User.findById(req.body.seller);
        var buyer = await User.findById(req.user._id);
        var admin = await db._find(Admin);
        let setting = await db._find(Setting, {}, { createdAt: 0, updatedAt: 0 });

        let balance = 0;
        let commission = 0;
        let paymentResponse;

        if ((setting.seller.levelTwoRating == user.ratingPercent) && (setting.seller.levelTwoCompletedOrder == user.completedOrder)) {
            commission = ((req.body.amount * setting.pricing.commissionLevelTwo) / 100);
            balance = req.body.amount - commission;  
        }
        if ((setting.seller.levelOneRating == user.ratingPercent) && (setting.seller.levelOneCompletedOrder == user.completedOrder)) {
            commission = ((req.body.amount * setting.pricing.commissionLevelOne) / 100);
            balance = req.body.amount - commission;
        }
        if ((setting.seller.topRatedRating == user.ratingPercent) && (setting.seller.topRatedCompletedOrder == user.completedOrder)) {
            commission = ((req.body.amount * setting.pricing.commissionTopRated) / 100);
            balance = req.body.amount - commission;
        }
        if (user.type == "NEWSELLER") {
            commission = ((req.body.amount * setting.pricing.commission) / 100);
            balance = req.body.amount - commission;
        }

        let paymentLog = {};
        let random = "FIV"+ Math.floor(Math.random() * (10000 - 1)) + 1;
        if((req.body.payment_mode).toUpperCase() == "WALLET"){
            if(buyer.wallet >= req.body.amount){
                console.log("wallet", buyer.wallet)
                paymentLog.transaction_code = random;
                paymentLog.service = "REQUEST";
                paymentLog.payment_mode = "WALLET";
                paymentLog.amount = req.body.amount;
                paymentLog.user = req.user._id;
                paymentLog.status = "Paid";
                
                buyer.wallet = buyer.wallet - req.body.amount;
                user.wallet += balance;
                admin.wallet += commission;
                paymentResponse = "Success";
            }else{
                const response = helper.response({ message: res.__('low_wallet_amount'), status: 422 });
                return res.status(response.statusCode).json(response);
            } 
        }else if((req.body.payment_mode).toUpperCase() == "STRIPE"){
            let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');

            let card = await db._find(Card, { user: req.user._id, isDefault: true });
            console.log("req", card)
            if(stripePayment && (card != null)) {

                let currency = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'currency')[0].value : '';
                let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';
                if(currency && secret_key) {
                  
                    paymentLog.transaction_code = random;
                    paymentLog.service = "REQUEST";
                    paymentLog.payment_mode = "STRIPE";
                    paymentLog.amount = req.body.amount;
                    paymentLog.user = req.user._id;

                    const stripe = Stripe(secret_key);
                    const charge = await stripe.charges.create({
                      amount: req.body.amount*100,
                      currency: currency,
                      customer: card.customerId
                    });

                    if(charge.status == 'succeeded') {
                         user.wallet += balance;      
                         admin.wallet += commission;                         
                         paymentResponse = "Success";  
                         paymentLog.status = "Paid";
                         
                    } else {
                         paymentResponse = "Failure";  
                         paymentLog.status = "Failed";
                        
                    }

                    
                } else {

                    const errorResponse = helper.response({ status: 422, message: 'Currency not Available!' });

                    return res.status(errorResponse.statusCode).json(errorResponse);
                }
            }else {

                    const errorResponse = helper.response({ status: 422, message: 'Please Add Credit Card in Your Account!' });

                    return res.status(errorResponse.statusCode).json(errorResponse);
            }
        }

        if(paymentResponse == "Success"){

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
                status: "PENDING",
                deliveryTime: req.body.duration,
                service: "REQUEST",
                revisions: 0
            }

            let orderData = await db._store(Order, order);
            if(req.body.message_id){
                let msg = await db._find(Message, {_id: req.body.message_id});

                msg.offer.order = orderData._id;
                msg.offer.status = "ORDERED";

                await db._update(Message, {_id: req.body.message_id}, msg);
            }   
            await db._store(PaymentLog, paymentLog);
            await db._update(User, { _id: orderData.seller }, user);
            await db._update(User, { _id: orderData.buyer }, buyer);
            await db._update(Admin, {}, admin);
            const response = helper.response({ message: res.__('created') });
            return res.status(response.statusCode).json(response);
        }else{
            const errorResponse = helper.response({ status: 422, message: 'Payment Failed!' });

            return res.status(errorResponse.statusCode).json(errorResponse);
        }

    /*} catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                return res.status(422).json(err.errors[i].message);
            }
        } else {
            return res.status(422).json(err);
        }
    }*/

}

