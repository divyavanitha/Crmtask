const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { object, string } = Joi.types();
const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const CancellationRequestSchema = mongoose.Schema({
    order: {
        type: Schema.Types.ObjectId, 
        ref: 'Order'
    },
    requestStatus: { type: String },
    cancellation_reason: { type: String },
    cancellation_message: { type: String },
    type: { type: String },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})



CancellationRequestSchema.methods.generateAuthToken = function (payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: 43000,
    });

    return token;
}


exports.CancellationRequest = mongoose.model('cancellationRequest', CancellationRequestSchema);
