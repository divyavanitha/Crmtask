const { User } = require('../models/user');
const { Post } = require('../models/Post');
var helper = require('../services/helper.js');
var db = require('../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const Log = new (require('../config/winston'));
const ObjectId = require('mongodb').ObjectID;

exports.getProfile = async (req, res) => {

    const errors = {};
    try {

        let user = await db._find(User, { _id: req.user._id });
        const data = { user };
        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                return res.status(422).json(err.errors[i].message);
            }
        } else {
            return res.status(422).json(err);
        }
    }
}

exports.updateProfile = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        first_name: Joi.string().required().label("First Name"),
        last_name: Joi.string().required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        mobile: Joi.string().required().min(6).label("Mobile"),
    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const response = helper.response({ status: 422, error: errorMessage });

    if (error) return res.status(response.statusCode).json(response);

    try {
        
        const user = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            mobile: req.body.mobile,
            profilePhoto: req.body.profile_photo,
        }
       

        if(req.files['profile_photo']) user.profilePhoto = req.protocol + '://' + req.get('host') + "/images/user/" + (req.files['profile_photo'][0].filename);

        let users = await db._update(User, { _id: req.body.id }, user);

        const response = helper.response({ message: res.__('updated') });
        return res.status(response.statusCode).json(response);

     } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                return res.status(422).json(err.errors[i].message);
            }
        } else {
            return res.status(422).json(err);
        }
    } 
}

exports.getPost = async (req, res) => {

    const errors = {};
    try {

        let post = await db._get(Post);
        console.log("post", post);
        const data = { post };
        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                return res.status(422).json(err.errors[i].message);
            }
        } else {
            return res.status(422).json(err);
        }
    }
}

exports.listPostbyid = async (req, res) => {
    try {

        let post = await db._find(Post, {_id:req.params.id});

        const data = { post };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

