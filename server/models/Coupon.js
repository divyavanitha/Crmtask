const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const couponSchema = mongoose.Schema({
    code:{
        type: String,
        required: true
    },
    percentage:{
        type: String,
        required: true
    },
    maxAmount:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    expiration:{
        type: String,
        required: true
    },
    sellerId:{ 
        type: Schema.Types.ObjectId, 
        ref: 'users' 
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

couponSchema.methods.generateAuthToken = function (payload) {
    
    const token = jwt.sign(payload, process.env.ADSECRET_KEY,{
		algorithm: "HS512",
		expiresIn: 3600,
	});
    return token;
}

function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        code: Joi.string().min(3).required().label("Promocode"),
        percentage: Joi.string().required().label("Percentage"),
        maxAmount: Joi.string().required().label("Maximum Amount"),
        description: Joi.string().label("Description"),
        expiration: Joi.date().required().label("Expiration")
     
    });

    return schema.validate(request);
}

exports.Coupon = mongoose.model('Coupon', couponSchema);
exports.validate = validate;