const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const pageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    content: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
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

pageSchema.methods.generateAuthToken = function (payload) {

    const token = jwt.sign(payload, process.env.SECRET_KEY,{
		algorithm: "HS512",
		expiresIn: 43000,
	});
  
    return token;
}

function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        page_name: Joi.string().min(3).required().label("Title"),
        content: Joi.string().required().label("Content")
     
    });

    return schema.validate(request);
}

exports.Page = mongoose.model('pages', pageSchema);
exports.validate = validate;