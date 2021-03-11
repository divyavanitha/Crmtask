const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const ConversationSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    lastMessage: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

exports.Conversation = mongoose.model('conversations', ConversationSchema);