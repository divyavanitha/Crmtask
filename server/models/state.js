const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = mongoose.Schema({
    _id: {
        type: Number
      },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    countryId: { type: Schema.Types.ObjectId, ref: 'Country' },
    timezone: {
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


exports.State = mongoose.model('state', stateSchema);
