const express = require("express");
const { Cart } = require('../models/Cart');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');

exports.listcart = async (req, res) => {
    try {

        let carts = await db._get(Cart, {user: req.user._id}, {}, { populate: [ { path: "gig", populate:[{path: "category", model: "category"}, {path: "subCategory", model: "SubCategory"}] }, "Package" ] } );

        const data = { carts };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.cartCount = async (req, res) => {
    try {

        let count = await db._count(Cart, {user: req.user._id} );

        const data = { count };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.addcart = async (req, res) => {

     const schema = Joi.object().options({ abortEarly: false }).keys({
        gig_id: Joi.string().required().label("Gig Id"),
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
        let cart_length = await db._get(Cart, {user: req.user._id} );
            var cart = {
                user: req.user._id,
                gig: req.body.gig_id,
                quantity: req.body.quantity,
                proposals: req.body.proposals,
                price: req.body.price,
                package: req.body.package_id,
                deliveryTime: req.body.deliveryTime,
                revisions: req.body.revision
            }

        let carts= await db._store(Cart, cart);
        /*carts.count = cart_length.length;
        console.log(carts.count);*/

        let count = await db._count(Cart, {user: req.user._id} );

        const response = helper.response({ message: res.__('inserted'), data: {"carts": carts, "count": count } });
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

        let cart_length = await db._get(Cart, {user: req.user._id} );

        const response = helper.response({ message: res.__('deleted'), data: cart_length });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }
}

exports.findcart = async (req, res) => {

     try {

        let carts = await db._find(Cart, {"_id":req.params.id});
        const data = { carts };

        const response = helper.response({ data });
       
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }
}