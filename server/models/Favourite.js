const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const favouriteSchema = mongoose.Schema({
    gig : {
        type: Schema.Types.ObjectId,
        ref: 'gigs'
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'users' 
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


exports.Favourite = mongoose.model('favourites', favouriteSchema);
