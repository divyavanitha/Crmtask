const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const notificationSchema = mongoose.Schema({
    sender : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    senderName: {
        type: String
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    },
    message: {
        type: String
    },
    deleted_at: {
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})


exports.Order = mongoose.model('notifications', notificationSchema);
