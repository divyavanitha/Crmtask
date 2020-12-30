const express = require("express");
const { Cart } = require('../models/Cart');
const { Order } = require('../models/Order');
const { Setting } = require('./../models/setting');
const { User } = require('../models/user');
const { Admin } = require('../models/admin');
const { Rating } = require('../models/Rating');
const { CancellationRequest } = require('../models/CancellationRequest');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');

exports.checkout = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        //coupon_id: Joi.string().required().label("Coupon Id"),
        wallet: Joi.boolean().required().label("wallet"),
        payment_mode: Joi.string().required().label("Payment Mode")

    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const errorResponse = helper.response({ status: 422, error: errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {
        if (req.body.id) {
            var carts = await db._get(Cart, { _id: req.body.id }, {}, { populate: "gig" });
        } else {
            var carts = await db._get(Cart, { user: req.user._id }, {}, { populate: "gig" });
        }
        let total = 0;

        if (carts.length > 0) {
            for (let i in carts) {

                total = total + (carts[i].price * carts[i].quantity);

                let orderId = 'FIV' + Math.floor(100000 + Math.random() * 900000);

                let setting = await db._find(Setting, {}, { createdAt: 0, updatedAt: 0 });

                let user = await User.findById(carts[i].gig.user);

                if ((setting.seller.levelTwoRating == user.ratingPercent) && (setting.seller.levelTwoCompletedOrder == user.completedOrder)) {
                    var commission = ((total * setting.pricing.commissionLevelTwo) / 100);
                }
                if ((setting.seller.levelOneRating == user.ratingPercent) && (setting.seller.levelOneCompletedOrder == user.completedOrder)) {
                    
                    var commission = ((total * setting.pricing.commissionLevelOne) / 100);

                }
                if ((setting.seller.topRatedRating == user.ratingPercent) && (setting.seller.topRatedCompletedOrder == user.completedOrder)) {
                    var commission = ((total * setting.pricing.commissionTopRated) / 100);
                }
                if (user.type == "NEWSELLER") {
                    var commission = ((total * setting.pricing.commission) / 100);
                }

                var order = {
                    orderId: orderId,
                    coupon: req.body.coupon_id,
                    wallet: req.body.wallet,
                    payment_mode: req.body.payment_mode,
                    buyer: req.user._id,
                    seller: carts[i].gig.user,
                    gig: carts[i].gig._id,
                    quantity: carts[i].quantity,
                    price: carts[i].price,
                    total: total,
                    commission: commission,
                    status: "PROGRESS",
                    deliveryTime: carts[i].deliveryTime,
                    revisions: carts[i].revisions
                }

                let orders = await db._store(Order, order);

                await db._delete(Cart, { "_id": carts[i]._id });

                let tot_carts = await db._get(Cart, { user: req.user._id });

                const response = helper.response({ message: res.__('inserted'), data: tot_carts });
                return res.status(response.statusCode).json(response);
            }
        } else {
            const response = helper.response({ message: res.__('cart_empty') });
            return res.status(response.statusCode).json(response);
        }




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



exports.updateOrder = async (req, res) => {

    if ((req.body.status).toUpperCase() == "DELIVERED") {
        var schema = Joi.object().options({ abortEarly: false }).keys({
            id: Joi.string().required().label("Order Id"),
            status: Joi.string().required().label("Status"),
            delivered_message: Joi.string().required().label("Delivery Message"),
        }).unknown(true);
    } else if ((req.body.status).toUpperCase() == "REVISION REQUESTED") {
        var schema = Joi.object().options({ abortEarly: false }).keys({
            id: Joi.string().required().label("Order Id"),
            status: Joi.string().required().label("Status"),
            revison_message: Joi.string().required().label("revison_message")
        }).unknown(true);
    } else if ((req.body.status).toUpperCase() == "CANCELLATION REQUESTED") {
        var schema = Joi.object().options({ abortEarly: false }).keys({
            id: Joi.string().required().label("Order Id"),
            status: Joi.string().required().label("Status"),
            cancellation_reason: Joi.string().required().label("Cancellation Reason"),
            cancellation_message: Joi.string().required().label("Cancellation Message"),
            cancelled_by: Joi.string().required().label("Cancelled by")
        }).unknown(true);
    } else {
        var schema = Joi.object().options({ abortEarly: false }).keys({
            id: Joi.string().required().label("Order Id"),
            status: Joi.string().required().label("Status")
        }).unknown(true);
    }


    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    /*const errorResponse = helper.response({ status: 422, error: errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {*/
        let order = await Order.findById(req.body.id);
        if ((req.body.status).toUpperCase() == "DELIVERED") {
            const arr = order.delivery_status;
            let index = (arr.length - 1);

            let delivery = [];

            if (index === -1) {
                let data = {
                    deliveredMessage: req.body.delivered_message,
                }
                if (req.files['delivery_file']) data.delivery_file = req.protocol + '://' + req.get('host') + "/images/order/" + req.files['delivery_file'][0].filename;

                delivery.push(data);

                order.delivery_status = delivery;

            } else {
                let data = {
                    deliveredMessage: req.body.delivered_message,
                }
                if (req.files['delivery_file']) data.delivery_file = req.protocol + '://' + req.get('host') + "/images/order/" + req.files['delivery_file'][0].filename;

                arr[index + 1] = data;
                delivery = arr[index];
            }
            console.log('delivery', delivery);
            order.status = (req.body.status).toUpperCase();

        } else if ((req.body.status).toUpperCase() == "COMPLETED") {

            order.status = (req.body.status).toUpperCase();

            var user = await User.findById(order.seller);
            var admin = await db._find(Admin);
            let setting = await db._find(Setting, {}, { createdAt: 0, updatedAt: 0 });

        if ((setting.seller.levelTwoRating == user.ratingPercent) && (setting.seller.levelTwoCompletedOrder == user.completedOrder)) {
            let comission = ((order.total * setting.pricing.commissionLevelTwo) / 100);
            let balance = order.total - comission;
            user.wallet += balance;
            admin.wallet += comission;
        }
        if ((setting.seller.levelOneRating == user.ratingPercent) && (setting.seller.levelOneCompletedOrder == user.completedOrder)) {
            let comission = ((order.total * setting.pricing.commissionLevelOne) / 100);
            let balance = order.total - comission;
            user.wallet += balance;
            admin.wallet += comission;

        }
        if ((setting.seller.topRatedRating == user.ratingPercent) && (setting.seller.topRatedCompletedOrder == user.completedOrder)) {
            let comission = ((order.total * setting.pricing.commissionTopRated) / 100);
            let balance = order.total - comission;
            user.wallet += balance;
            admin.wallet += comission;
        }
        if (user.type == "NEWSELLER") {
            let comission = ((order.total * setting.pricing.commission) / 100);
            let balance = order.total - comission;
            user.wallet += balance;
            admin.wallet += comission;
        }


        } else if ((req.body.status).toUpperCase() == "REVISION REQUESTED") {

            const arr = order.used_revisions;
            let index = (arr.length - 1);

            let revision = [];

            if (index === -1) {
                let data = {
                    revision_message: req.body.revison_message,
                }
                if (req.files['revision_file']) data.revision_file = req.protocol + '://' + req.get('host') + "/images/order/" + req.files['revision_file'][0].filename;

                revision.push(data);

                order.used_revisions = revision;

            } else {
                let data = {
                    revision_message: req.body.revison_message,
                }
                if (req.files['revision_file']) data.revision_file = req.protocol + '://' + req.get('host') + "/images/order/" + req.files['revision_file'][0].filename;

                arr[index + 1] = data;
                revision = arr[index];
            }
            console.log('revision', revision);


            order.status = (req.body.status).toUpperCase();

        } else if ((req.body.status).toUpperCase() == "CANCELLATION REQUESTED") {

            order.status = (req.body.status).toUpperCase();
            order.cancellation_reason = req.body.cancellation_reason;
            order.cancellation_message = req.body.cancellation_message;
            order.cancelled_by = req.body.cancelled_by;
        }

        let orders = await db._update(Order, { _id: req.body.id }, order);
        await db._update(User, { _id: order.seller }, user);
        await db._update(Admin, {}, admin);
        const response = helper.response({ message: res.__('updated'), data: order });
        return res.status(response.statusCode).json(response);

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

exports.cancel = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("Order Id"),
        cancel_status: Joi.string().required().label("Cancel Status")

    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const errorResponse = helper.response({ status: 422, error: errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {

        let order = await Order.findById(req.body.id);

        if ((req.body.cancel_status).toUpperCase() == "Accepted") {
            order.CancelRequestStatus = (req.body.cancel_status).toUpperCase();
            order.status = "CANCELLED";
        } else {
            order.CancelRequestStatus = (req.body.cancel_status).toUpperCase();
            order.status = "PROGRESS";
        }


        let orders = await db._update(Order, { _id: req.body.id }, order);

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

}

exports.tips = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("Order Id"),
        tips: Joi.number().required().label("Tip Amount"),
        tip_message: Joi.string().required().label("Tip Message")

    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const errorResponse = helper.response({ status: 422, error: errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {


        let order = {
            tips: req.body.tips,
            tip_message: req.body.tip_message
        }


        let orders = await db._update(Order, { _id: req.body.id }, order);

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

}

exports.rating = async (req, res) => {

    if (req.body.type == "seller") {
        var schema = Joi.object().options({ abortEarly: false }).keys({
            order_id: Joi.string().required().label("Order Id"),
            seller_rating: Joi.string().required().label("Seller Rating"),
            seller_comment: Joi.string().required().label("Seller Comment")

        }).unknown(true);
    } else if (req.body.type == "buyer") {
        var schema = Joi.object().options({ abortEarly: false }).keys({
            order_id: Joi.string().required().label("Order Id"),
            buyer_rating: Joi.string().required().label("Buyer Rating"),
            buyer_comment: Joi.string().required().label("Buyer Comment")

        }).unknown(true);
    } else {
        var schema = Joi.object().options({ abortEarly: false }).keys({
            order_id: Joi.string().required().label("Order Id"),
            type: Joi.string().required().label("Type")

        }).unknown(true);
    }

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const errorResponse = helper.response({ status: 422, error: errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {

        let rate = await db._find(Rating, { orderId: req.body.order_id });

        let order = await Order.findById(req.body.order_id);

        let user = await User.findById(order.seller);

        let order_count = await db._count(Order, { seller: order.seller });

        let setting = await db._find(Setting, {}, { createdAt: 0, updatedAt: 0 });

        if (rate != null) {

            if (req.body.type == "buyer") {
                var rating = {
                    buyerRating: req.body.buyer_rating,
                    buyerComment: req.body.buyer_comment,
                    gig: order.gig,
                    seller: order.seller,
                    buyer: order.buyer,
                    buyer_at: new Date()
                }

                order.buyer_rated = 1;

            } else {
                var rating = {
                    sellerRating: req.body.seller_rating,
                    sellerComment: req.body.seller_comment,
                    gig: order.gig,
                    seller: order.seller,
                    buyer: order.buyer,
                    seller_at: new Date()
                }

                order.seller_rated = 1;
                user.completedOrder += 1;
            }
            await db._update(Rating, { _id: rate._id }, rating);

        } else {
            if (req.body.type == "buyer") {
                var rating = {
                    orderId: req.body.order_id,
                    buyerRating: req.body.buyer_rating,
                    buyerComment: req.body.buyer_comment,
                    gig: order.gig,
                    seller: order.seller,
                    buyer: order.buyer,
                    buyer_at: new Date()
                }

                order.buyer_rated = 1;
            } else {
                var rating = {
                    orderId: req.body.order_id,
                    sellerRating: req.body.seller_rating,
                    sellerComment: req.body.seller_comment,
                    gig: order.gig,
                    seller: order.seller,
                    buyer: order.buyer,
                    seller_at: new Date()
                }

                order.seller_rated = 1;
                user.completedOrder += 1;
            }

            await db._store(Rating, rating);
        }

        let total_rate = await Rating.aggregate([
            { $match: { seller: order.seller } },
            {
                $group:
                {
                    _id: "$seller",
                    average: { $avg: '$buyerRating' },
                    count: { $sum: 1 },
                    total: { $sum: '$buyerRating' }
                }
            }
        ]);


        user.gig = order.gig;
        user.ratingPercent = (total_rate[0].total / (order_count * 5) * 100);
        user.rating = total_rate[0].average;

        if ((setting.seller.levelTwoRating == user.ratingPercent) && (setting.seller.levelTwoCompletedOrder == user.completedOrder)) {
            user.type = "LEVELTWO";
        }
        if ((setting.seller.levelOneRating == user.ratingPercent) && (setting.seller.levelOneCompletedOrder == user.completedOrder)) {
            user.type = "LEVELONE";

        }
        if ((setting.seller.topRatedRating == user.ratingPercent) && (setting.seller.topRatedCompletedOrder == user.completedOrder)) {
            user.type = "TOPRATED";
        }

        await db._update(User, { _id: order.seller }, user);
        let orders = await db._update(Order, { _id: req.body.order_id }, order);

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

}