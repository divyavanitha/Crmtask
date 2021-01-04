const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = mongoose.Schema({
    _id: {
        type: Number
      },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    stateId: { type: Number, ref: 'state' },
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


exports.City = mongoose.model('city', citySchema);
