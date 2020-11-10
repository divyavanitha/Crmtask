const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { object, string } = Joi.types();
const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const cartSchema = mongoose.Schema({
    gig : {
        type: Schema.Types.ObjectId,
        ref: 'gigs'
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    package: { 
        type: Schema.Types.ObjectId, 
        ref: 'Package', 
        required: false 
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



cartSchema.methods.generateAuthToken = function (payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: 43000,
    });

    return token;
}


exports.Cart = mongoose.model('carts', cartSchema);
