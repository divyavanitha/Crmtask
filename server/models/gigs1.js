const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { object, string } = Joi.types();

const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const PakageSchema = new Schema(
    {
        nameofpakage: {
            type: String,
            required: true,
            trim: true
        },
        describeoffers: {
            type: String,
            required: true,
            trim: true
        },
        deliverytime: {
            type: String,
            required: true,
            trim: true
        },
        revision: {
            type: String,

            trim: true
        },
        price: {
            type: Number,

            trim: true,
        }

    }
)


// const extragigSchema = new Schema({
//     _id: false,
//         basic:[{
//             _id: false,
//         nameofpakage: {
//             type: String

//         }},{
//         deliverytime: {
//             type: Number

//         }},{
//         price: {
//             type: Number    

//         }}
//     ] 
//     ,
//     standard: [{
//         _id: false,
//         nameofpakage: {
//             type: String

//         }},{
//         deliverytime: {
//             type: Number

//         }},{
//         price: {
//             type: Number    

//         }}
//     ]
//     ,
//     premium:[{ _id: false,
//         nameofpakage: {
//             type: String

//         }},{
//         deliverytime: {
//             type: Number

//         }},{
//         price: {
//             type: Number    

//         }}]

// })
const extragigSchema = new Schema({
    basic:
    {
        nameofpakage: String,
        describeoffers: String,
        deliverytime: String
    }
    ,
    standard:
    {
        nameofpakage: String,
        describeoffers: String,
        deliverytime: String
    }
    ,
    premium:
    {
        nameofpakage: String,
        describeoffers: String,
        deliverytime: String
    }
    ,
})
const gigSchema = mongoose.Schema({
    yourjobtitle: {
        type: String,
        required: true,
        trim: true,
        maxlength: 80,
        unique: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    metadata: {
        type: [String],
        required: true,
        trim: true
    },
    searchtag: {
        type: [String],
        required: true,
        trim: true
    },
    basic: PakageSchema,
    standard: PakageSchema,
    premium: PakageSchema,
    myextragigs: extragigSchema,
    brieflydescribegig: {
        type: String,
        minlength: 120,
        maxlength: 1200,
    },
    // gigquestion: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'gigquestions'

    // },
    gigquestion: { type: Array, "default": [] },
    requirement: {
        type: String,

    },
    is_active: {
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

// askquestionSchema = new Schema({
//     question: {
//         type: String,
//         trim: true,
//     }
// });


gigSchema.methods.generateAuthToken = function (payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: 43000,
    });

    return token;
}

function validate(request) {
    let basic = Joi.object().keys({
        nameofpakage: Joi.string().required().label("nameofpakage"),
        describeoffers: Joi.string().required().label("describeoffers"),
        deliverytime: Joi.string().label("deliverytime")
    })
    let standard = Joi.object().keys({
        nameofpakage: Joi.string().required().label("nameofpakage"),
        describeoffers: Joi.string().required().label("describeoffers"),
        deliverytime: Joi.string().label("deliverytime")
    })
    let premium = Joi.object().keys({
        nameofpakage: Joi.string().required().label("nameofpakage"),
        describeoffers: Joi.string().required().label("describeoffers"),
        deliverytime: Joi.string().label("deliverytime")
    })
    const schema = Joi.object().options({ abortEarly: false }).keys({
        yourjobtitle: Joi.string().min(12).required().label("yourjobtitle"),
        category: Joi.string().required().label("category"),
        metadata: Joi.string().required().label("metadata"),
        searchtag: Joi.string().required().label("searchtag"),
        brieflydescribegig: Joi.string().required().label("brieflydescribegig"),
        gigquestion: Joi.array().required().label("gigquestion"),
        basic: Joi.object().keys({
            nameofpakage: Joi.string().required().label("nameofpakage"),
            describeoffers: Joi.string().required().label("describeoffers"),
            deliverytime: Joi.string().label("deliverytime")

        }).required().label("basic"),
        standard: Joi.object().keys({
            nameofpakage: Joi.string().required().label("nameofpakage"),
            describeoffers: Joi.string().required().label("describeoffers"),
            deliverytime: Joi.string().label("deliverytime")
        }).required().label("standard"),
        premium: Joi.object().keys({
            nameofpakage: Joi.string().required().label("nameofpakage"),
            describeoffers: Joi.string().required().label("describeoffers"),
            deliverytime: Joi.string().label("deliverytime")
        }).required().label("premium"),
        // // )
        myextragigs:Joi.object({
            basic: Joi.object().keys({
                nameofpakage:Joi.string().required().label("nameofpakage"),
                 describeoffers:Joi.string().required().label("describeoffers"),
                deliverytime:Joi.string().required().label("deliverytime")
            })
              ,
              standard:Joi.object().keys({
                nameofpakage:Joi.string().required().label("nameofpakage"),
                 describeoffers:Joi.string().required().label("describeoffers"),
                deliverytime:Joi.string().required().label("deliverytime")
            }),
              premium: Joi.object().keys({
                nameofpakage:Joi.string().required().label("nameofpakage"),
                 describeoffers:Joi.string().required().label("describeoffers"),
                deliverytime:Joi.string().required().label("deliverytime")
            })
            })
    });

    return schema.validate(request);
}

exports.Gig = mongoose.model('gigs', gigSchema);
exports.validate = validate;