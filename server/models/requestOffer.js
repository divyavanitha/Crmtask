const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { object, string } = Joi.types();
const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const requestOfferSchema = mongoose.Schema({
    gig: { type: Schema.Types.ObjectId, ref: 'gigs' },
    request: { type: Schema.Types.ObjectId, ref: 'Request' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    description: {
        type: String
    },
    duration: {
        type: String,
        required: true
    },
    amount: {
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



requestOfferSchema.methods.generateAuthToken = function (payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: 43000,
    });

    return token;
}


module.exports = mongoose.model('requestOffer', requestOfferSchema);
