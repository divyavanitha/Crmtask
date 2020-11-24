const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { object, string } = Joi.types();
const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const orderSchema = mongoose.Schema({
    coupon: {
        type: Schema.Types.ObjectId,
        ref: 'Coupon'
    },
    buyer: { type: Schema.Types.ObjectId, ref: 'users' },
    seller: { type: Schema.Types.ObjectId, ref: 'users' },
    gig : {
        type: Schema.Types.ObjectId,
        ref: 'gigs'
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    wallet: {
        type: Boolean, 
        required: true
    },
    payment_mode: {
        type: String, 
        required: true
    },
    status: {
        type: Number, 
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
   
    updated_at: {
        type: Date,
        default: Date.now
    }
})



orderSchema.methods.generateAuthToken = function (payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: 43000,
    });

    return token;
}


exports.Order = mongoose.model('orders', orderSchema);
