const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { object, string } = Joi.types();
const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const requestSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    description: {
        type: String
    },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    subCategory: { type: Schema.Types.ObjectId, ref: 'subCategory' },
    duration: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    files: {
        type: String
    },
    status:{
        type: String
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



requestSchema.methods.generateAuthToken = function (payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: 43000,
    });

    return token;
}


exports.Request = mongoose.model('Request', requestSchema);
