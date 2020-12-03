const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');


const CancelReasonSchema = mongoose.Schema({
    reason:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
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

CancelReasonSchema.methods.generateAuthToken = function (payload) {
    
    const token = jwt.sign(payload, process.env.ADSECRET_KEY,{
		algorithm: "HS512",
		expiresIn: 3600,
	});
    return token;
}

function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        reason: Joi.string().min(3).required().label("Reason")
     
    });

    return schema.validate(request);
}

exports.CancelReason = mongoose.model('CancelReason', CancelReasonSchema);
exports.validate = validate;