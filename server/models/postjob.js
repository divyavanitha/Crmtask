const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { object, string } = Joi.types();
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


// Create Schema
const postjobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title:{
    type: String,
    trim: true,
  },
  jobhighlight:{
   type: String
  },
  workplace:{type: String},
  freelancer:{type: String},
  jobdescription:{type: String},
  responsibilities:{type: String},
  date: {
    type: Date,
    default: Date.now
  }
});
        
function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        title:Joi.string().required().label("title"),
        jobhighlight:Joi.string().required().label("jobhighlight"),
        workplace:Joi.string().required().label("workplace"),
        freelancer:Joi.string().required().label("freelancer"),
        jobdescription:Joi.string().required().label("jobdescription"),
        responsibilities:Joi.string().required().label("responsibilities")
    });

    return schema.validate(request);
}

exports.Postjob = mongoose.model('postjobs', postjobSchema);
exports.validate = validate;