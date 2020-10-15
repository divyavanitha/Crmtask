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
  titleofjob:{
    type: String,
    trim: true,
  },
  nooffreelancers: {
    type: String,
    trim: true,
  },
  skillneeded: {
    type: [String]
    },
  rate: {
    type: String,
    default: "byprice",
    enum: ["byhour", "byprice"]
  },
  timetakenforjob: {
    type: String,
    trim: true,
    required: true,
  },
  workperweek: {
    type: String,
    trim: true,
    required: true,
    },
  helpforwhat: {
    type: String,
    trim: true,
    required: true,
  },
  workfor: {
    type: String,
    trim: true,
    required: true,
  },
  qualityneeded: {
    type: String,
    trim: true,
    required: true
  },
  filetoattach:{
    type: String,
    trim: true,
    required: true
  }, 
findandapply:{
    type: String,
    trim: true, 
    required: true
},
addfreelancer:{
    type: String,
    trim: true,
    
},

  prefferedqualification:[{
      freelancertype:{type: String},
      jobsucessscore:{type: String},
      risingtalent:{type: String},
      howbiilledonwork:{type: String},
      location:{type: String},
      englishlevel:{type: String},
      group:{type: String}
  }],
screeningquestion:{type: String},
  
  date: {
    type: Date,
    default: Date.now
  }
});
        
function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
      // handle: Joi.string().max(40).required().label("handle"),
      titleofjob:Joi.string().required().label("titleofjob"),
      nooffreelancers: Joi.string().required().label("nooffreelancers"),
      skillneeded: Joi.string().required().label("skillneeded"),
      rate:Joi.string().required().label("rate"),
      timetakenforjob:Joi.string().required().label("timetakenforjob"),
      qualityneeded:Joi.string().required().label("qualityneeded"),
      workperweek:Joi.string().required().label("workperweek"),
      helpforwhat:Joi.string().required().label("helpforwhat"),
      workfor:Joi.string().required().label("workfor"),
      qualityneeded:Joi.string().required().label("qualityneeded"),
      filetoattach:Joi.string().required().label("filetoattach"),
      findandapply:Joi.string().required().label("findandapply"),
    
      prefferedqualification:Joi.array().items(
        Joi.object({
            freelancertype:Joi.string().required().label("freelancertype"),
            jobsucessscore:Joi.string().required().label("jobsucessscore"),
            risingtalent:Joi.string().label("risingtalent"),
            howbiilledonwork:Joi.string().label("howbiilledonwork"),
            location:Joi.string().required().label("location"),
            englishlevel:Joi.string().required().label("englishlevel"),
            group:Joi.string().label("group")
        })),
        addfreelancer:Joi.string().required().label("addfreelancer"),
      //   education:Joi.array().items(
      //     Joi.object({
      //       school:Joi.string().required().label("school")
      //         }))
               
    });

    return schema.validate(request);
}

exports.Postjob = mongoose.model('postjobs', postjobSchema);
exports.validate = validate;