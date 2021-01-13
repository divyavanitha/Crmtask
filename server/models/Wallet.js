const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const walletSchema = mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    },
    payment_mode: {
        type: String, 
        required: true
    },
    message: {
        type: Number,
        required: true
    },
    paymentId: {
        type: Number,
        required: true
    },
    payment: {
        type: Number,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        default: true
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


exports.Withdrawal = mongoose.model('wallets', walletSchema);