const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { object, string } = Joi.types();
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    trim: true,
    max: 40
  },
  company: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    trim: true
  },
  skills: {
    type: [String],
     trim: true,
     required: true,
  },
  bio: {
    type: String
  },
  business :{
    type: String
  },
  languages:{
    type: [String],
    required: true,
  },
  From:{
  type: String,
  required: true,
  },
  experience: [
    {
      title: {
        type: String
       
      },
      company: {
        type: String
     
      },
      location: {
        type: String
      },
      from: {
        type: Date
        
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String
        
      },
      degree: {
        type: String
       
      },
      fieldofstudy: {
        type: String
    
      },
      from: {
        type: Date
        
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
      // handle: Joi.string().max(40).required().label("handle"),
      status: Joi.string().required().label("status"),
      skills: Joi.array().required().label("skills"),
      languages:Joi.array().required().label("languages"),
      company:Joi.string().required().label("company"),
      website:Joi.string().required().label("website"),
      bio:Joi.string().required().label("bio"),
      business:Joi.string().required().label("business"),
      handle:Joi.string().required().label("handle"),
      From:Joi.string().required().label("From"),
      location:Joi.string().required().label("location")

      // experience:Joi.array().items(
      //   Joi.object({
      //     title:Joi.string().required().label("title"),
      //     company:Joi.string().required().label("company"),
      //     from:Joi.string().required().label("from")
      //   })),
      //   education:Joi.array().items(
      //     Joi.object({
      //       school:Joi.string().required().label("school")
      //         }))
               
    });

    return schema.validate(request);
}

exports.Profile = mongoose.model('Profile', ProfileSchema);
exports.validate = validate;