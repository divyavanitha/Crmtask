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
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

exports.Message = mongoose.model('messages', MessageSchema);
