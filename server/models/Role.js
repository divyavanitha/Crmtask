const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    permissions: [{
        permission: { type: Schema.Types.ObjectId, ref: 'permissions' }
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

exports.Role = mongoose.model('roles', roleSchema);