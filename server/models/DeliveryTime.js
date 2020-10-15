const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');


const deliveryTimeSchema = mongoose.Schema({
    name:{
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

deliveryTimeSchema.methods.generateAuthToken = function (payload) {
    
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

exports.DeliveryTime = mongoose.model('DeliveryTime', deliveryTimeSchema);
exports.validate = validate;