const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const setupSchema = mongoose.Schema({
    appname: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    apptitle: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

// setupSchema.methods.generateAuthToken = function(payload) {
//     const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 3600});
//     return token;
// }

function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        appname: Joi.string().min(5).required().label("appname"),
        apptitle: Joi.string().required().label("apptitle"),

    });

    return schema.validate(request);
}

exports.Setup = mongoose.model('Setup', setupSchema);
exports.validate = validate;