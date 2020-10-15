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
  company: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
 
  status: {
    type: String,
 
  },
  skills: {
    type: [String],
     trim: true,
    
  },
  bio: {
    type: String
  },
  address:{type:String},
  business :{
    type: String
  },
  languages:{
    type: [String],

  },
  From:{
  type: String,

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
      company:Joi.string().label("company"),
      website:Joi.string().label("website"),
      bio:Joi.string().label("bio"),
      status: Joi.string().label("status"),
      languages:Joi.array().label("languages"),
      business:Joi.string().label("business"),
      address :Joi.string().label("address"),
      // skills: Joi.array().required().label("skills"),
       
     
      
      
     
     
      // handle:Joi.string().required().label("handle"),
      // From:Joi.string().required().label("From"),
      // location:Joi.string().required().label("location")

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