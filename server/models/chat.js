const mongoose=  require('mongoose');
const { v4  }=require('uuid');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

// Create Schema
const chatSchema = mongoose.Schema({

      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
   
      message: {
        type: String
        },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    type: {
        type: String
    }
})
chatSchema.methods.generateAuthToken = function (payload) {

  const token = jwt.sign(payload, process.env.SECRET_KEY,{
  algorithm: "HS512",
  expiresIn: 43000,
});

  return token;
}

function validate(request) {

  const schema = Joi.object().options({ abortEarly: false }).keys({
      
    message: Joi.string().min(3).required().label("message")
  });

  return schema.validate(request);
}

exports.Chat=mongoose.model("Chat", chatSchema);
exports.validate = validate;
