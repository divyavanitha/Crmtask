const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const settingSchema = mongoose.Schema({
    site: {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        logo: {
            type: String,
            default: false
        },
        favicon: {
            type: String,
            default: false
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        mobile: {
            type: String,
            required: true,
            trim: true
        },
        copyright: {
            type: String,
            default: false
        }
    },
    appLink: [{
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        url: {
            type: String,
            default: false
        }
    }],
   socialLink: [{
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        url: {
            type: String,
            default: false
        }
    }],
    social: {
        status: {
            type: Boolean,
            default: false
        },
        facebookAppId: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        facebookAppSecret: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        facebookRedirect: {
            type: String,
            default: false
        },
        googleClientId: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        googleClientSecret: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        googleRedirect: {
            type: String,
            default: false
        }
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
