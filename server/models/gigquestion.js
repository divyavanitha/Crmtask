const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const answersschema = mongoose.Schema({
    answers:{
        type: [String],
        trim: true,
        maxlength: 80
    }
    
})

const gigquestionSchema = mongoose.Schema({
    gigquestion:{
        type: [String],
        trim: true,
        maxlength: 80
    },
    answers:[answersschema]
})

exports.Gigquestion = mongoose.model('gigquestions', gigquestionSchema);