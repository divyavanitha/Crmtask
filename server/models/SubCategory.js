const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


const subCategorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId, 
        ref: 'category', 
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

subCategorySchema.methods.generateAuthToken = function (payload) {
    
    const token = jwt.sign(payload, process.env.ADSECRET_KEY,{
		algorithm: "HS512",
		expiresIn: 3600,
	});
    return token;
}

function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().min(3).required().label("Name"),
        category: Joi.string().required().label("Category Id")
     
    });

    return schema.validate(request);
}

exports.SubCategory = mongoose.model('SubCategory', subCategorySchema);
exports.validate = validate;