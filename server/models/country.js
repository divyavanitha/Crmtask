const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    _id: {
        type: Number
      },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    countryCode: {
        type: String,
        trim: true,
        minlength: 1
    },
    phoneCode: {
        type: String,
        trim: true,
        minlength: 1
    },
    currency: {
        type: String,
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


exports.Country = mongoose.model('Country', countrySchema);
