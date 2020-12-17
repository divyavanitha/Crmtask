const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { object, string } = Joi.types();

const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const gigSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 80,
        unique: true
    },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    subCategory : { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    tags: [],
    requirement: {
        type: String
    },
    pricing: [{
        package: { type: Schema.Types.ObjectId, ref: 'Package', required: false },
        name: { type: String },
        description: { type: String },
        revisions: { type: String },
        price: { type: Number },
        DeliveryTime: { type: String },
        
    }],
    fixed_price: { type: Boolean },
    proposals: [{
        name: { type: String },
        price: { type: Number }
        
    }],
    modify_description: { type: String},
    status: { type: String},
    featured: { type: Boolean , default: false},
    top_rated: { type: Boolean , default: false},
    faq: [{
        question: { type: String },
        answer: { type: String }
    }],
    photo: {
        type: Array   
    },
    rating: { type: Number },
    created_at: {
        type: Date,
        default: Date.now
    },
   
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date
    }
})



gigSchema.methods.generateAuthToken = function (payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: 43000,
    });

    return token;
}

function validate(request) {
   
    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().min(12).required().label("title"),
        overview: Joi.string().required().label("overview"),
        experience: Joi.string().required().label("experience"),
        servicename: Joi.string().required().label("servicename"),
        otheridentity: Joi.string().required().label("otheridentity"),
        freelancername: Joi.string().required().label("freelancername"),
        // shot_overview:Joi.string().required().label("shot_overview"),
        // startingpricerange:Joi.string().required().label("startingpricerange")
       
    });

    return schema.validate(request);
}

exports.Gig = mongoose.model('gigs', gigSchema);
exports.validate = validate;