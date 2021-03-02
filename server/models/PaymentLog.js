const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const paymentLogSchema = mongoose.Schema({
    service:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    payment_mode:{
        type: String,
        required: true
    },
    transaction_code:{
        type: String,
        required: true
    },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    seller: { type: Schema.Types.ObjectId, ref: 'users' },
    status: {
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

paymentLogSchema.methods.generateAuthToken = function (payload) {
    
    const token = jwt.sign(payload, process.env.ADSECRET_KEY,{
		algorithm: "HS512",
		expiresIn: 3600,
	});
    return token;
}

function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().min(3).required().label("Name")
     
    });

    return schema.validate(request);
}

exports.PaymentLog = mongoose.model('PaymentLog', paymentLogSchema);
exports.validate = validate;