const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    status: {
        type: Boolean,
        default: true
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


exports.Skill = mongoose.model('skill', skillSchema);
