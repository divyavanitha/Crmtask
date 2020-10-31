const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const SchemaTypes = mongoose.Schema.Types;
/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        trim: true,
    },
    loginBy: {
        type: String
    },
    socialUniqueId: {
        type: String
    },
    deviceType: {
        type: String
    },
    deviceToken: {
        type: String
    },
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    language: [{
        language: { type: Schema.Types.ObjectId, ref: 'Language' },
        level: { type: String },
        status: { type: Boolean, default: false }
    }],
    profilePhoto: {
        type: String
    },
    coverPhoto: {
        type: String
    },
    headline: {
        type: String
    },
    description: {
        type: String
    },
    experience: {
        type: String
    },
    skill: [{
        skill: { type: Schema.Types.ObjectId, ref: 'Skill' },
        level: { type: String },
    }],
    education: [{
        country: { type: Schema.Types.ObjectId, ref: 'Country' },
        institute: { type: String },
        title: { type: String },
        major: { type: String },
        year: { type: Number },
    }],
    certification: [{
        name: { type: String },
        certifier: { type: String },
        year: { type: Number },
    }],
    rating: {
        type: Number
    },
    referralId: {
        type: String,
        minlength: 6,
        trim: true,
    },
    is_active: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.generateAuthToken = function (payload) {

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: 43000,
    });

    return token;
}

function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        firstName: Joi.string().min(3).required().label("First Name"),
        lastName: Joi.string().min(3).required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        mobile: Joi.string().required().label("Mobile"),
        password: Joi.string().min(6).label("Password"),
        confirm_password: Joi.any().valid(Joi.ref('password')).required()
    });

    return schema.validate(request);
}

exports.User = mongoose.model('users', userSchema);
exports.validate = validate;