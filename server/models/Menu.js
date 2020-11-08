const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const menuSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    subTitle:{
        type: String,
        required: true
    },
    layoutPhoto: {
        type: String,
        default: false
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategory:{
        type: Schema.Types.ObjectId,
        ref: 'SubCategory'
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

menuSchema.methods.generateAuthToken = function (payload) {
    
    const token = jwt.sign(payload, process.env.ADSECRET_KEY,{
		algorithm: "HS512",
		expiresIn: 3600,
	});
    return token;
}

function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().min(3).required().label("Title"),
        subTitle: Joi.string().min(3).required().label("Sub Title"),
        category: Joi.string().required().label("Category Id")
     
    });

    return schema.validate(request);
}

exports.Menu = mongoose.model('Menu', menuSchema);
exports.validate = validate;