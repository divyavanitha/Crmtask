const express = require("express");
const { Cart } = require('../models/Cart');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
const { Gig } = require('../models/gigs');
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

        let existingCart = await db._find(Cart, { gig: req.body.gig_id } );
       
        if(req.body.package) {

            let gig = await db._find(Gig, {_id: req.body.gig_id, pricing: { $elemMatch : { package: { $eq: req.body.package } }} }, { pricing: 1, createdAt: -1, updatedAt: -1 });

            let pricing = gig.pricing.find(price => { return price.package == req.body.package })

            var cart = {
                    user: req.user._id,
                    gig: req.body.gig_id,
                    quantity: req.body.quantity,
                    price: pricing.price,
                    package: pricing.package,
                    deliveryTime: pricing.DeliveryTime,
                    revisions: pricing.revisions
                }

        } else {

            let gig = await db._find(Gig, {_id: req.body.gig_id}, { pricing: 1, createdAt: -1, updatedAt: -1 });
     
            var cart = {
                    user: req.user._id,
                    gig: req.body.gig_id,
                    quantity: req.body.quantity,
                    price: gig.pricing[0].price,
                    package: gig.pricing[0].package,
                    deliveryTime: gig.pricing[0].DeliveryTime,
                    revisions: gig.pricing[0].revisions
                }
        }

        if(existingCart) {
            cart.quantity = existingCart.quantity + req.body.quantity;
            await db._update(Cart, { _id: existingCart.id }, cart);
            var carts = await db._find(Cart, { gig: req.body.gig_id } );
        } else {
            var carts = await db._store(Cart, cart);
        }

        let count = await db._count(Cart, {user: req.user._id} );

        const response = helper.response({ message: res.__('cart_added'), data: {"carts": carts, "count": count } });
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
           
            var value = {
                quantity: req.body.quantity
            }

        await db._update(Cart, { _id: req.body.id }, value);
        let cart = await db._find(Cart, { _id: req.body.id } );
        let carts = await db._get(Cart, {user: req.user._id}, {}, { populate: [ { path: "gig", populate:[{path: "category", model: "category"}, {path: "subCategory", model: "SubCategory"}] }, "Package" ] } );

        let data = {cart, carts}

         const response = helper.response({ message: res.__('updated'), data });
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