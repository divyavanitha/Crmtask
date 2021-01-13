const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { object, string } = Joi.types();
const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const cardSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: false 
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    funding: {
        type: String,
        required: true
    },
    lastFour: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    cardId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    isDefault:{
        type: Boolean,
        default: false
    },
    type:{
        type: String,
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



exports.Card = mongoose.model('cards', cardSchema);
