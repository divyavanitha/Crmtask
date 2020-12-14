const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { object, string } = Joi.types();
const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const ratingSchema = mongoose.Schema({
    orderId : {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    gig : {
        type: Schema.Types.ObjectId,
        ref: 'gigs'
    },
    seller : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    buyer : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    sellerRating: {
        type: Number,
        default: 1
    },
    buyerRating: {
        type: Number,
        default: 1
    },
    sellerComment: {
        type: String
    },
    buyerComment: {
        type: String
    },
    seller_at: {
        type: Date
    },
    buyer_at: {
        type: Date
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



ratingSchema.methods.generateAuthToken = function (payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: 43000,
    });

    return token;
}


exports.Rating = mongoose.model('ratings', ratingSchema);
