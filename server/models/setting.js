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
            trim: true
        },
        mobile: {
            type: String,
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
        url: {
            type: String
        },
        picture: {
            type: String
        }
    }],
    social: {
        status: {
            type: Boolean,
            default: false
        },
        facebookAppId: {
            type: String,
            trim: true
        },
        googleClientId: {
            type: String,
            trim: true
        },
        appleId: {
            type: String,
            trim: true
        },
    },
    sms: {
        status: {
            type: Boolean,
            default: false
        },
        provider: {
            type: String,
            trim: true
        },
        sid: {
            type: String,
            trim: true
        },
        token: {
            type: String,
            trim: true
        },
        sender: {
            type: String,
            trim: true
        }
    },
    mail: {
        status: {
            type: Boolean,
            default: false
        },
        service: {
            type: String,
            trim: true
        },
        username: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            trim: true
        },
        from: {
            type: String,
            trim: true
        }
    },
    payment: [{
         name: {
             type: String,
             required: true,
             trim: true,
             minlength: 1
         },
         status: {
             type: Boolean,
             default: false
         },
         credentials: [{
            name: {
                type: String,
                trim: true
            },
            value: {
                type: String,
                trim: true
            }
         }]
     }],
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
