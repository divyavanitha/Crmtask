const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const MessageSchema = new Schema({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'conversations',
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    message: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    offer: {
        gig: { type: Schema.Types.ObjectId, ref: 'gigs' },
        seller: { type: Schema.Types.ObjectId, ref: 'users' },
        description: {
            type: String
        },
        duration: {
            type: String
        },
        amount: {
            type: Number
        },
        status: {
            type: String
        },
        order: {
            type: String
        }
    },
    date: {
        type: String,
        default: Date.now,
    },
});

exports.Message = mongoose.model('messages', MessageSchema);
