const express = require("express");
const { Cart } = require('../models/Cart');
const { Order } = require('../models/Order');
const { Rating } = require('../models/Rating');
const { DeliveryStatus } = require('../models/DeliveryStatus');
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
        let cart_length = await db._get(Cart, {user: req.user._id} );
            var cart = {
                user: req.user._id,
                gig: req.body.gig_id,
                quantity: req.body.quantity,
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


exports.checkout = async (req, res) => {

     const schema = Joi.object().options({ abortEarly: false }).keys({
        //coupon_id: Joi.string().required().label("Coupon Id"),
        wallet: Joi.boolean().required().label("wallet"),
        payment_mode: Joi.string().required().label("Payment Mode"),
        //gig_id: Joi.string().required().label("Gig Id"),
        //quantity: Joi.number().required().label("Quantity"),
        total: Joi.number().required().label("total")

    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    /*const errorResponse = helper.response({ status: 422, error:errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {*/
            if(req.body.id){
              var carts = await db._get(Cart, {_id: req.body.id});  
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

exports.buyerOrderList = async (req, res) => {
    try {

        let orders = await db._get(Order, {buyer: req.user._id}, {}, {populate: "gig"});

        const data = { orders };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.buyerOrderDetails = async (req, res) => {
    try {

        let gig = await db._find(Order, {_id: req.params.id}, {}, { populate: ["gig","seller"] });


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

        const data = { orders };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.sellerOrderDetails = async (req, res) => {
    try {

        let order = await db._find(Order, {_id: req.params.id}, {}, { populate: ["gig","buyer"] });


        const data = { order };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
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

        order.user_rated=1;

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

exports.deliveryStatus = async (req, res) => {
    try {

        let delivery_status = await db._find(DeliveryStatus, {order: req.params.id});


        const data = { delivery_status };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

