const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const slideSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    layoutPhoto: {
        type: String,
        default: false
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    status:{
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

slideSchema.methods.generateAuthToken = function (payload) {
    
    const token = jwt.sign(payload, process.env.ADSECRET_KEY,{
		algorithm: "HS512",
		expiresIn: 3600,
	});
    return token;
}

exports.Slide = mongoose.model('Slide', slideSchema);
