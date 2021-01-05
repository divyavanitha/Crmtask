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
    last_four: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    card_id: {
        type: String,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: { 
        type: Schema.Types.ObjectId, 
        ref: 'Package', 
        required: false 
    },
    isDefault:{
        type: Boolean,
        default: true
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
