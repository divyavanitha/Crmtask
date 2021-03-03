const express = require("express");
const { Cart } = require('../models/Cart');
const { Card } = require('../models/Card');
const { Order } = require('../models/Order');
const { Setting } = require('./../models/setting');
const { Notification } = require('../models/Notification');
const { Gig } = require('../models/gigs');
const { User } = require('../models/user');
const { Admin } = require('../models/admin');
const { Rating } = require('../models/Rating');
const { CancellationRequest } = require('../models/CancellationRequest');
const { PaymentLog } = require('../models/PaymentLog');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const Stripe = require('stripe');

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

                total = carts[i].price * carts[i].quantity;

                let orderId = 'FIV' + Math.floor(100000 + Math.random() * 900000);

                let user = await User.findById(carts[i].gig.user);
                var buyer = await User.findById(req.user._id);
                var admin = await db._find(Admin);
                let setting = await db._find(Setting, {}, { createdAt: 0, updatedAt: 0 });

                let balance = 0;
                let commission = 0;
                let paymentResponse;

                if ((setting.seller.levelTwoRating == user.ratingPercent) && (setting.seller.levelTwoCompletedOrder == user.completedOrder)) {
                    commission = ((total * setting.pricing.commissionLevelTwo) / 100);
                    balance = total - commission;        
                }
                if ((setting.seller.levelOneRating == user.ratingPercent) && (setting.seller.levelOneCompletedOrder == user.completedOrder)) {
                    commission = ((total * setting.pricing.commissionLevelOne) / 100);
                    balance = total - commission;
                }
                if ((setting.seller.topRatedRating == user.ratingPercent) && (setting.seller.topRatedCompletedOrder == user.completedOrder)) {
                    commission = ((total * setting.pricing.commissionTopRated) / 100);
                    balance = total - commission;      
                }
                if (user.type == "NEWSELLER") {
                    commission = ((total * setting.pricing.commission) / 100);
                    balance = total - commission;
                }

                let paymentLog = {};
                let random = "FIV"+ Math.floor(Math.random() * (10000 - 1)) + 1;
                if((req.body.payment_mode).toUpperCase() == "WALLET"){
                    if(buyer.wallet >= total){

                        paymentLog.transaction_code = random;
                        paymentLog.service = "ORDER";
                        paymentLog.payment_mode = "WALLET";
                        paymentLog.amount = total;
                        paymentLog.user = req.user._id;
                        paymentLog.status = "Paid";
                        
                        buyer.wallet = buyer.wallet - total;
                        user.wallet += balance;
                        paymentResponse = "Success";
                    }else{
                        const response = helper.response({ message: res.__('low_wallet_amount'), status: 422 });
                        return res.status(response.statusCode).json(response);
                    } 
                }else if((req.body.payment_mode).toUpperCase() == "STRIPE"){
                    let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');

                    let card = await db._find(Card, { user: req.user._id, isDefault: true });
        
                    if(stripePayment) {
                        let currency = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'currency')[0].value : '';
                        let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';
                        if(currency && secret_key) {
                          
                            paymentLog.transaction_code = random;
                            paymentLog.service = "ORDER";
                            paymentLog.payment_mode = "STRIPE";
                            paymentLog.amount = total;
                            paymentLog.user = req.user._id;

                            const stripe = Stripe(secret_key);
                            const charge = await stripe.charges.create({
                              amount: total*100,
                              currency: currency,
                              customer: card.customerId
                            });

                            let response;
                            let message;
                            let status;
                            const user = await db._find(User, { _id: req.user._id });
                            if(charge.status == 'succeeded') {                               
                                 paymentResponse = "Success";  
                                 paymentLog.status = "Paid";
                                 
                            } else {
                                 paymentResponse = "Failure";  
                                 paymentLog.status = "Failed";
                                
                            }

                            
                        } else {

                            const errorResponse = helper.response({ status: 500, error: 'Currency not available!' });

                            return res.status(errorResponse.statusCode).json(errorResponse);
                        }
                    }
                }
    
                admin.wallet += commission;

                if(paymentResponse == "Success"){
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

                    paymentLog.order = orders._id;

                    let notification = {
                        sender: orders.buyer,
                        senderType: "BUYER",
                        receiver: orders.seller,
                        type: "ORDER",
                        orderId: orders._id,
                        message: "Has just sent you an offer on your request click here to view."
                    }
                    await db._store(Notification, notification);
                    
                    await db._delete(Cart, { "_id": carts[i]._id });

                    await db._store(PaymentLog, paymentLog);
                    await db._update(User, { _id: orders.seller }, user);
                    await db._update(User, { _id: orders.buyer }, buyer);
                    await db._update(Admin, {}, admin);

                    
                }
               
            }
            let tot_carts = await db._get(Cart, { user: req.user._id });
            const response = helper.response({ message: res.__('inserted'), data: tot_carts });
            return res.status(response.statusCode).json(response);
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

    const errorResponse = helper.response({ status: 422, error: errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {
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

            var notification = {
                sender: order.seller,
                senderType: "SELLER",
                receiver: order.buyer,
                type: "ORDER",
                orderId: order._id,
                message: "Delivered your order."
            }
            

        } else if ((req.body.status).toUpperCase() == "COMPLETED") {

            order.status = (req.body.status).toUpperCase();

            var user = await User.findById(order.seller);
            var gig = await Gig.findById(order.gig);

            user.recentDelivery = new Date();
            user.completedOrder += 1;

            gig.completedOrder +=1;

            var notification = {
                sender: order.buyer,
                senderType: "BUYER",
                receiver: order.seller,
                type: "ORDER",
                orderId: order._id,
                message: "Completed your order."
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

            var notification = {
                sender: order.buyer,
                senderType: "BUYER",
                receiver: order.seller,
                type: "ORDER",
                orderId: order._id,
                message: "Requested for a revision."
            }

        } else if ((req.body.status).toUpperCase() == "CANCELLATION REQUESTED") {

            order.status = (req.body.status).toUpperCase();
            order.cancellation_reason = req.body.cancellation_reason;
            order.cancellation_message = req.body.cancellation_message;
            order.cancelled_by = req.body.cancelled_by;

            if(req.user._id == order.buyer){
                var sender = order.buyer;
                var receiver = order.seller;
                var sender_type = "BUYER";
            }else if (req.user._id == order.seller){
                var sender = order.seller;
                var receiver = order.buyer;
                var sender_type = "SELLER";
            }

            var notification = {
                sender: sender,
                senderType: sender_type,
                receiver: receiver,
                type: "ORDER",
                orderId: order._id,
                message: "Wants to cancel the order."
            }
        }

        await db._update(Order, { _id: req.body.id }, order);
        let orders = await db._find(Order, {_id: req.body.id}, {}, { populate: ["gig","buyer","seller"] });
        await db._update(User, { _id: order.seller }, user);
        await db._update(Gig, { _id: order.gig }, gig);
        await db._store(Notification, notification);
        const response = helper.response({ message: res.__('updated'), data: orders, status: 200 });
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

        if ((req.body.cancel_status).toUpperCase() == "ACCEPTED") {
            order.CancelRequestStatus = (req.body.cancel_status).toUpperCase();
            order.status = "CANCELLED";

            if(req.user._id == order.buyer){
                var sender = order.buyer;
                var receiver = order.seller;
                var sender_type = "BUYER";
            }else if (req.user._id == order.seller){
                var sender = order.seller;
                var receiver = order.buyer;
                var sender_type = "SELLER";
            }

            var notification = {
                sender: sender,
                senderType: sender_type,
                receiver: receiver,
                type: "ORDER",
                orderId: order._id,
                message: "Accepted cancellation request."
            }

        } else {
            order.CancelRequestStatus = (req.body.cancel_status).toUpperCase();
            order.status = "PROGRESS";

            if(req.user._id == order.buyer){
                var sender = order.buyer;
                var receiver = order.seller;
                var sender_type = "BUYER";
            }else if (req.user._id == order.seller){
                var sender = order.seller;
                var receiver = order.buyer;
                var sender_type = "SELLER";
            }

            var notification = {
                sender: sender,
                senderType: sender_type,
                receiver: receiver,
                type: "ORDER",
                orderId: order._id,
                message: "Declined your cancellation request."
            }
        }


        await db._update(Order, { _id: req.body.id }, order);
        await db._store(Notification, notification);
        let orders = await db._find(Order, {_id: req.body.id}, {}, { populate: ["gig","buyer","seller"] });
        const response = helper.response({ message: res.__('inserted'), data: orders });
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
    if(req.body.tip_status == 1){
        var schema = Joi.object().options({ abortEarly: false }).keys({
            id: Joi.string().required().label("Order Id"),
            tips: Joi.number().required().label("Tip Amount"),
            tip_message: Joi.string().required().label("Tip Message")

        }).unknown(true);
    }else {
        var schema = Joi.object().options({ abortEarly: false }).keys({
            id: Joi.string().required().label("Order Id")

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

        let order_detail = await Order.findById(req.body.id);
        var user = await User.findById(order_detail.seller);
        var buyer = await User.findById(order_detail.buyer);
        let setting = await db._find(Setting, {}, { createdAt: 0, updatedAt: 0 });

            let order = {
                tips: req.body.tips,
                tip_message: req.body.tip_message,
                tip_status: req.body.tip_status
            }

            let paymentLog = {};
            let random = "FIV"+ Math.floor(Math.random() * (10000 - 1)) + 1;
            if((order_detail.payment_mode).toUpperCase() == "WALLET"){
                if(buyer.wallet >= req.body.tips){

                    paymentLog.transaction_code = random;
                    paymentLog.service = "TIPS";
                    paymentLog.payment_mode = "WALLET";
                    paymentLog.amount = req.body.tips;
                    paymentLog.user = req.user._id;
                    paymentLog.status = "Paid";
                    
                    buyer.wallet -= req.body.tips;
                    user.wallet += req.body.tips;
                    paymentResponse = "Success";
                }else{
                    const response = helper.response({ message: res.__('low_wallet_amount'), status: 422 });
                    return res.status(response.statusCode).json(response);
                } 
            }else if((order_detail.payment_mode).toUpperCase() == "STRIPE"){
                let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');

                let card = await db._find(Card, { user: req.user._id, isDefault: true });
    
                if(stripePayment) {
                    let currency = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'currency')[0].value : '';
                    let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';
                    if(currency && secret_key) {
                      
                        paymentLog.transaction_code = random;
                        paymentLog.service = "TIPS";
                        paymentLog.payment_mode = "STRIPE";
                        paymentLog.amount = req.body.tips;
                        paymentLog.user = req.user._id;

                        const stripe = Stripe(secret_key);
                        const charge = await stripe.charges.create({
                          amount: req.body.tips*100,
                          currency: currency,
                          customer: card.customerId
                        });

                        let response;
                        let message;
                        let status;
                        const user = await db._find(User, { _id: req.user._id });
                        if(charge.status == 'succeeded') {                               
                             paymentResponse = "Success";  
                             paymentLog.status = "Paid";
                             
                        } else {
                             paymentResponse = "Failure";  
                             paymentLog.status = "Failed";
                            
                        }

                        
                    } else {

                        const errorResponse = helper.response({ status: 500, error: 'Currency not available!' });

                        return res.status(errorResponse.statusCode).json(errorResponse);
                    }
                }
            }
            if(req.body.tip_status == 1){
                var notification = {
                    sender: req.user._id,
                    senderType: "BUYER",
                    receiver: order_detail.seller,
                    type: "ORDER",
                    orderId: order_detail._id,
                    message: "Has given you "+req.body.tips+" tip."
                }
            }

        await db._update(Order, { _id: req.body.id }, order);
        let orders = await db._find(Order, {_id: req.body.id}, {}, { populate: ["gig","buyer","seller"] });
        await db._update(User, { _id: order_detail.seller }, user);
        await db._update(User, { _id: order_detail.buyer }, buyer);
        await db._store(Notification, notification);
        const response = helper.response({ message: res.__('tips_added'), data: orders  });
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

        var gig = await Gig.findById(order.gig);

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

                var notification = {
                    sender: order.buyer,
                    senderType: "BUYER",
                    receiver: order.seller,
                    type: "ORDER",
                    orderId: order._id,
                    message: "Please review and rate your buyer."
                }

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

                var notification = {
                    sender: order.seller,
                    senderType: "SELLER",
                    receiver: order.buyer,
                    type: "ORDER",
                    orderId: order._id,
                    message: "Please review and rate your seller."
                }
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

                var notification = {
                    sender: order.buyer,
                    senderType: "BUYER",
                    receiver: order.seller,
                    type: "ORDER",
                    orderId: order._id,
                    message: "Please review and rate your buyer."
                }
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

                var notification = {
                    sender: order.seller,
                    senderType: "SELLER",
                    receiver: order.buyer,
                    type: "ORDER",
                    orderId: order._id,
                    message: "Please review and rate your seller."
                }
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

        let gig_rate = await Rating.aggregate([
            { $match: { seller: order.seller, gig: order.gig } },
            {
                $group:
                {
                    _id: "$seller",
                    average: { $avg: '$buyerRating' }
                }
            }
        ]);


        user.gig = order.gig;
        user.ratingPercent = (total_rate[0].total / (order_count * 5) * 100);
        user.rating = total_rate[0].average;

        gig.rating = gig_rate[0].average;

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
        await db._update(Gig, { _id: order.gig }, gig);
        await db._store(Notification, notification);
        await db._update(Order, { _id: req.body.order_id }, order);
        let ratings = await db._find(Rating, {orderId: req.body.order_id});
        let orders = await db._find(Order, {_id: req.body.order_id}, {}, { populate: ["gig","buyer","seller"] });
        let data = {ratings, orders}
        const response = helper.response({ message: res.__('rated'), data , status: 200 });
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