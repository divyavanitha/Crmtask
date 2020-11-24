const express = require("express");
const { Cart } = require('../models/Cart');
const { Order } = require('../models/Order');
const { Rating } = require('../models/Rating');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');

exports.listcart = async (req, res) => {
    try {

        let carts = await db._get(Cart, {}, {}, { populate: [ { path: "gig", populate:[{path: "category", model: "category"}, {path: "subCategory", model: "SubCategory"}] }, "Package" ] } );

        const data = { carts };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.addcart = async (req, res) => {

     const schema = Joi.object().options({ abortEarly: false }).keys({
        gig_id: Joi.string().required().label("Gig Id"),
        quantity: Joi.number().required().label("Quantity"),
        price: Joi.number().required().label("Price")

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

            var cart = {
                user: req.user._id,
                gig: req.body.gig_id,
                quantity: req.body.quantity,
                price: req.body.price,
                package: req.body.package_id
            }

        let carts= await db._store(Cart, cart);

        const response = helper.response({ message: res.__('inserted'), data: carts });
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

exports.updateCart = async (req, res) => {

     const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("Cart Id"),
        quantity: Joi.number().required().label("Quantity")

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
           
            var cart = {
                quantity: req.body.quantity
            }

        let carts= await db._update(Cart, { _id: req.body.id }, cart);

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

exports.removecart = async (req, res) => {

	 try {

        let carts = await db._delete(Cart, {"_id":req.params.id});

        const response = helper.response({ message: res.__('deleted') });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }
}


exports.checkout = async (req, res) => {

     const schema = Joi.object().options({ abortEarly: false }).keys({
        coupon_id: Joi.string().required().label("Coupon Id"),
        wallet: Joi.string().required().label("wallet"),
        payment_mode: Joi.string().required().label("Payment Mode"),
        gig_id: Joi.string().required().label("Gig Id"),
        quantity: Joi.number().required().label("Quantity"),
        total: Joi.number().required().label("total")

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

            var order = {
                coupon: req.body.coupon_id,
                wallet: req.body.wallet,
                payment_mode: req.body.payment_mode,
                buyer: req.user._id,
                seller: req.body.seller_id,
                gig: req.body.gig_id,
                quantity: req.body.quantity,
                price: req.body.price,
                status: 1
            }

        let orders= await db._store(Order, order);

        const response = helper.response({ message: res.__('inserted'), data: order });
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

