const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');


const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

categorySchema.methods.generateAuthToken = function (payload) {
    
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

exports.Category = mongoose.model('category', categorySchema);
exports.validate = validate;