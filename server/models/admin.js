const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    wallet: {
        type: Number,
        default: 0
    },
    roles: [{
        role: { type: Schema.Types.ObjectId, ref: 'roles' }
    }],
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
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

adminSchema.pre('save', function(next) {
  if(!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if(err) return next(err);
      this.password = hash;

      next()
    })
  })
})

adminSchema.methods.generateAuthToken = function (payload) {
    
    const token = jwt.sign(payload, process.env.SECRET_KEY,{
		algorithm: "HS512",
		expiresIn: '1h',
	});
    return token;
}



adminSchema.methods.generateRefreshToken = function (payload) {

    const token = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {
        algorithm: "HS512",
        expiresIn: '1d', 
    });

    return token;
}

function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().min(3).required().label("Name"),
        email: Joi.string().required().label("Email"),
        password: Joi.string().min(6).label("Password"),
        confirm_password: Joi.any().valid(Joi.ref('password')).required()
    });

    return schema.validate(request);
}

exports.Admin = mongoose.model('admin', adminSchema);
exports.validate = validate;