const express = require("express");
const { Request } = require("../../models/Request");
const { RequestOffer } = require('../../models/RequestOffer');
const { Notification } = require('../../models/Notification');
const { Order } = require('../../models/Order');
const { Admin } = require('../../models/admin');
const helper = require('../../services/helper.js');
const { Withdrawal } = require("../../models/Withdrawal");
const { User } = require('../../models/user');
const { Gig } = require('../../models/gigs');
const db = require('../../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId; 

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
        await db._delete(RequestOffer, {request: req.params.id});
        
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

        let requestData = await db._find(Request, { _id: req.params.id });
        var admin = await db._find(Admin);

        const request = {
            status: req.params.status,
        }

        if((req.params.status).toUpperCase() == "APPROVE"){
            var notification = {
                sender: admin._id,
                senderType: "ADMIN",
                receiver: requestData.user,
                type: "REQUEST",
                message: "Has approved your Request. Thanks for posting."
            }
        }else if((req.params.status).toUpperCase() == "DECLINE"){
            var notification = {
                sender: admin._id,
                senderType: "ADMIN",
                receiver: requestData.user,
                type: "REQUEST",
                message: "Has declined your Request. Please submit a valid Request."
            }
        }

        let requests = await db._update(Request, { _id: req.params.id }, request);
        await db._store(Notification, notification);
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

exports.withdrawlList = async (req, res) => {
    console.log(req.query);
    try {
        let count, withdrawl;


        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;

        let pending_count = await db._count(Withdrawal, {status: "PENDING"});
        let decline_count = await db._count(Withdrawal, {status: "DECLINE"});
        let completed_count = await db._count(Withdrawal, {status: "COMPLETED"});

        if((req.query.type).toUpperCase() == "PENDING"){
             withdrawl = await db._get(Withdrawal, { status: "PENDING" }, {}, {populate: "user"});
             count = pending_count;
        }else if((req.query.type).toUpperCase() == "DECLINE"){   
             withdrawl = await db._get(Withdrawal, { status: "DECLINED" }, {}, {populate: "user"});
             count = decline_count;
        }else{
             withdrawl = await db._get(Withdrawal, { status: "COMPLETED" }, {}, {populate: "user"});
             count = completed_count;
        }
        
        const data = { 
            withdrawl
        };

        const response = helper.response({ data: helper.paginate(req, data, count) });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.withdrawlChangeStatus = async (req, res) => {
    try {

        var admin = await db._find(Admin);

        let withdrawl = await db._find(Withdrawal, { _id: req.params.id, status: "PENDING" });

        let user = await db._find(User, {_id: withdrawl.user});

        withdrawl.status = req.params.status;


        if((req.params.status).toUpperCase() == "COMPLETED"){
            user.wallet = (user.wallet - withdrawl.price);
            var notification = {
                sender: admin._id,
                receiver: user._id,
                senderType: "ADMIN",
                type: "WITHDRAWL",
                message: "Has approved your Withdrawl Request."
            }
        }else if((req.params.status).toUpperCase() == "DECLINED"){
            var notification = {
                sender: admin._id,
                receiver: user._id,
                senderType: "ADMIN",
                type: "WITHDRAWL",
                message: "Has declined your Withdrawl Request."
            }
        }
        await db._update(User, { _id: withdrawl.user }, user);
        let requests = await db._update(Withdrawal, { _id: req.params.id }, withdrawl);
        await db._store(Notification, notification);
        const response = helper.response({ message: res.__('updated'), data: withdrawl });
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

exports.sellerDetails = async (req, res) => {
    try {

        let orders = await db._get(Order, {seller: req.params.id}, {}, { populate: [ 
            { path: "seller", populate: { path: 'country', model: 'Country', select: 'name' } }
            ] });

        let delivered_order = await db._get(Order, {seller: req.params.id, status: "DELIVERED"});

        let completed_order = await db._get(Order, {seller: req.params.id, status: "COMPLETED"});

        let cancelled_order = await db._get(Order, {seller: req.params.id, status: "CANCELLED"});

        let active_order = await db._get(Order, {seller: req.params.id, status:  {$in : ["PROGRESS", "CANCELLATION REQUESTED", "REVISION REQUESTED", "DELIVERED"]} });

        let user = await db._find(User, {_id: req.params.id}, {}, {populate: {path: 'country', model: 'Country'}});


        var date = new Date();
        console.log(new Date(date.getFullYear(), date.getMonth(), 1));
        console.log(new Date(date.getFullYear(), date.getMonth() + 1, 0));

        let earnings = await Order.aggregate([
            { $match: { seller: new ObjectId(req.params.id), status: "COMPLETED" } },
            {
                $group:
                {
                    _id: "$seller",
                    total: { $sum: '$total' }
                }
            }
        ]);

        let balance_amount = await Order.aggregate([
            { $match: { seller: new ObjectId(req.params.id), status: { $nin: ["CANCELLED", "COMPLETED"] } } },
            {
                $group:
                {
                    _id: "$seller",
                    total: { $sum: '$total' }
                }
            }
        ]);

        let withdrawl = await Withdrawal.aggregate([
            { $match: { user: new ObjectId(req.params.id), status: "COMPLETED" } },
            {
                $group:
                {
                    _id: "$user",
                    total: { $sum: '$price' }
                }
            }
        ]);

        let pending_withdrawl = await Withdrawal.aggregate([
            { $match: { user: new ObjectId(req.params.id), status: "PENDING" } },
            {
                $group:
                {
                    _id: "$user",
                    total: { $sum: '$price' }
                }
            }
        ]);

        let gig = await db._get(Gig, { user: req.params.id, status: "ACTIVE", deleted_at: null });


        const response = helper.response({ data: {"orders": orders, "delivered_order": delivered_order, "completed_order": completed_order, "cancelled_order": cancelled_order, "active_order": active_order, "earnings": earnings, "balance_amount": balance_amount, "withdrawl": withdrawl, "pending_withdrawl": pending_withdrawl, "gig": gig, "user": user } });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}