const mongoose = require('mongoose');

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const permissionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    resource: {
        type: Array
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

exports.Permission = mongoose.model('permissions', permissionSchema);