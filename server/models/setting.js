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
            type: String
        },
        favicon: {
            type: String
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
            trim: true
        },
        playstoreLink: {
            type: String,
            trim: true
        },
        appstoreLink: {
            type: String,
            trim: true
        }
    },
   socialLink: [{
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        title: {
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
    sms: {
        status: {
            type: Boolean,
            default: false
        },
        provider: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        sid: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        token: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        sender: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        }
    },
    mail: {
        status: {
            type: Boolean,
            default: false
        },
        service: {
            type: String,
            trim: true,
            minlength: 1
        },
        username: {
            type: String,
            trim: true,
            minlength: 1
        },
        password: {
            type: String,
            trim: true,
            minlength: 1
        },
        from: {
            type: String,
            trim: true,
            minlength: 1
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
