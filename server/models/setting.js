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
    application: {
        manualApproval: {
             type: Boolean,
             default: false
        },
        editApproval: {
             type: Boolean,
             default: false
        },
        manualBuyerRequestApproval: {
             type: Boolean,
             default: false
        },
        referGig: {
             type: Boolean,
             default: false
        }
    },
    seller: {
        newSellerRating: {
            type: Number,
            required: true
        },
        newSellerCompletedOrder: {
            type: Number,
            required: true
        },
        newSellerPayout: {
            type: Date,
            default: Date.now
        },
        levelOneRating: {
            type: Number,
            required: true
        },
        levelOneCompletedOrder: {
            type: Number,
            required: true
        },
        levelOnePayout: {
            type: Date,
            default: Date.now
        },
        levelTwoRating: {
            type: Number,
            required: true
        },
        levelTwoCompletedOrder: {
            type: Number,
            required: true
        },
        levelTwoPayout: {
            type: Date,
            default: Date.now
        },
        topRatedRating: {
            type: Number,
            required: true
        },
        topRatedCompletedOrder: {
            type: Number,
            required: true
        },
        topRatedPayout: {
            type: Date,
            default: Date.now
        }
    },
    gig: {
        minimumWithdrawalPeriod: {
            type: Number,
            required: true
        },
        minimumGigPrice: {
            type: Number,
            required: true
        },
        minimumWithdrawalLimit: {
            type: Number,
            required: true
        },
        featuredGigPrice: {
            type: Number,
            required: true
        },
        featuredGigDuration: {
            type: Number,
            required: true
        },
        processingFee: {
            type: Number,
            required: true
        }
    },
    pricing: {
        commissionLevelOne: {
            type: Number,
            required: true
        },
        commissionLevelTwo: {
            type: Number,
            required: true
        },
        commissionTopRated: {
            type: Number,
            required: true
        },
        commission: {
            type: Number,
            required: true
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
