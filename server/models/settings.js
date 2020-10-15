const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const settingSchema = mongoose.Schema({
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
        required: true,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
    },
    countryId: { type: Schema.Types.ObjectId, ref: 'Country' },
    cityId: { type: Schema.Types.ObjectId, ref: 'City' },
    language: [{
        language: { type: Schema.Types.ObjectId, ref: 'Language' },
        level: { type: String },
        status: { type: Boolean, default: false }
    }],
    profilePhoto: {
        type: String,
        default: false
    },
    coverPhoto: {
        type: String,
        default: false
    },
    headline: {
        type: String,
        default: false
    },
    description: {
        type: String,
        default: false
    },
    experience: {
        type: String,
        default: false
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
        type: Boolean,
        default: false
    },
    referralId: {
        type: String,
        required: true,
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

exports.Setting = mongoose.model('Setting', settingSchema);
