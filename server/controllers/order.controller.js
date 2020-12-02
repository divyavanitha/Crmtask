const express = require("express");
const { Cart } = require('../models/Cart');
const { Order } = require('../models/Order');
const { Rating } = require('../models/Rating');
const { DeliveryStatus } = require('../models/DeliveryStatus');
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

    const errorResponse = helper.response({ status: 422, error:errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {
            if(req.body.id){
              var carts = await db._get(Cart, {_id: req.body.id}, {}, { populate: "gig" });  
            }else{
              var carts = await db._get(Cart, {user: req.user._id}, {}, { populate: "gig" }  ); 
            }
           let total = 0;
           for(let i in carts) {

                total = total + carts[i].price;
            }
     console.log(total);      

           for(let i in carts) {

                total = total + carts[i].price;

                let orderId = 'FIV'+Math.floor(100000 + Math.random() * 900000);

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
                    status: "Progress",
                    deliveryTime: carts[i].deliveryTime,
                    revisions: carts[i].revisions
                }

                let orders= await db._store(Order, order);

                await db._delete(Cart, {"_id":carts[i]._id});
            }
            
            let tot_carts = await db._get(Cart, {user: req.user._id}); 

        const response = helper.response({ message: res.__('inserted'), data: tot_carts });
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



exports.updateOrder = async(req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("Order Id"),
        status: Joi.string().required().label("Status"),
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
        let order = await Order.findById(req.body.id);
        if(req.body.status == "Delivered"){
            
            order.status= req.body.status;
            

            let data = { 
                order: req.body.id,
                waterMark: req.body.enable_watermark,
                deliveredMessage: req.body.delivered_message,
            }
            if(req.files['delivery_file']) data.delivery_file = req.protocol+ '://' +req.get('host')+"/images/order/" + req.files['delivery_file'][0].filename;

            let delivery_status = await db._store(DeliveryStatus, data);
        }else if(req.body.status == "Completed"){

            order.status= req.body.status;
            

        }

        let orders = await db._update(Order, { _id: req.body.id }, order);
        const response = helper.response({ message: res.__('updated'), data: order });
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



exports.revisionRequest = async(req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("Order Id"),
        revison_message: Joi.string().required().label("Revision Message")
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

        let order = await Order.findById(req.body.id);
        const arr = order.used_revisions;
        let index = (arr.length - 1);

        let revision = [];

        if (index === -1) {
           let data = { 
            revison_message: req.body.revison_message,  
            }
            if(req.files['revision_file']) data.revision_file = req.protocol+ '://' +req.get('host')+"/images/revision/" + req.files['revision_file'][0].filename;

            revision.push(data);
            
            order.used_revisions = revision; 

        }else{
            let data = { 
            revison_message: req.body.revison_message,  
            }
            if(req.files['revision_file']) data.revision_file = req.protocol+ '://' +req.get('host')+"/images/revision/" + req.files['revision_file'][0].filename;
            
            arr[index+1] = data;
            revision = arr[index];
        }
        console.log('revision', revision);
        

        order.status= "Revision Requested";

        let orders = await db._update(Order, { _id: req.body.id }, order);
        const response = helper.response({ message: res.__('updated'), data: order });
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

     const schema = Joi.object().options({ abortEarly: false }).keys({
        order_id: Joi.string().required().label("Order Id"),
        rating: Joi.string().required().label("Rating"),
        comment: Joi.string().required().label("Comment"),

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

        

            let rating = {
                orderId: req.body.order_id,
                rating: req.body.rating,
                comment: req.body.comment
            }

        let ratings= await db._store(Rating, rating);

        let order = await Order.findById(req.body.order_id);
        if(req.body.type == "buyer"){
            order.seller_rated=1;
        }else{
            order.buyer_rated=1;
        }
        

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