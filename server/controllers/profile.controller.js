const { User } = require('../models/user');
const { SubCategory } = require('../models/SubCategory');
const { Category } = require('../models/category');
const { DeliveryTime } = require('../models/DeliveryTime');
const { Coupon } = require('../models/Coupon');
const { Slide } = require('../models/Slide');
const { Menu } = require('../models/Menu');
const { Package } = require('../models/Package');
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
        city: Joi.string().required().label("City"),
        headline: Joi.string().required().label("Headline"),
        description: Joi.string().required().label("Description"),
        state: Joi.string().required().label("State")
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
            city: req.body.city,
            country: req.body.country,
            profilePhoto: req.body.profile_photo,
            coverPhoto: req.body.cover_photo,
            headline: req.body.headline,
            description: req.body.description,
            state: req.body.state
        }
       

        if(req.files['profile_photo']) user.profilePhoto = req.protocol + '://' + req.get('host') + "/images/user/" + (req.files['profile_photo'][0].filename);
        if(req.files['cover_photo']) user.coverPhoto = req.protocol + '://' + req.get('host') + "/images/user/" + (req.files['cover_photo'][0].filename);


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

exports.updateLanguage = async (req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("User Id"),
        language: Joi.array().required().label("Language"),
        level: Joi.array().required().label("Language Level")

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

        let user = await User.findById(ObjectId(req.body.id));
        const arr = user.language;
        let index = (arr.length - 1);
        let language = [];
        if (index === -1) {
            for (let i in req.body.language) {
                let lang = {
                    language: req.body.language[i],
                    level: req.body.level[i]
                }
                language.push(lang);
            }
        } else {
            for(let i in req.body.language) {
                let lang = {
                    language: req.body.language[i],
                    level: req.body.level[i]
                }
                arr[index+1] = lang;
                language = arr[index];
            }
            
        }

        if (language.length > 0) user.language = language;

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

exports.updateSkill = async (req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("User Id"),
        skill: Joi.array().required().label("Skill"),
        level: Joi.array().required().label("Skill Level")

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

        let user = await User.findById(ObjectId(req.body.id));

        const arr = user.skill;
        let index = (arr.length - 1);
        let skills = [];
        if (index === -1) {

            for (let i in req.body.skill) {
                let skill = {
                    skill: req.body.skill[i],
                    level: req.body.level[i]
                }
                skills.push(skill);
            }
        } else {
            for(let i in req.body.skill) {
                let skill = {
                    skill: req.body.skill[i],
                    level: req.body.level[i]
                }
                arr[index+1] = skill;
                skills = arr[index];
            }
            
        }

        if (skills.length > 0) user.skill = skills;

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

exports.updateEducation = async (req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("User Id"),
        country: Joi.array().required().label("Country"),
        institute: Joi.array().required().label("Institute"),
        title: Joi.array().required().label("Title"),
        major: Joi.array().required().label("Major"),
        year: Joi.array().required().label("Year"),

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

        let user = await User.findById(ObjectId(req.body.id));
        const arr = user.education;
        let index = (arr.length - 1);
        let education = [];
        if (index === -1) {

            for (let i in req.body.country) {
                let edu = {
                    country: req.body.country[i],
                    institute: req.body.institute[i],
                    title: req.body.title[i],
                    major: req.body.major[i],
                    year: req.body.year[i],
                }
                education.push(edu);
            }
        } else {
            for(let i in req.body.country) {

                let edu = {
                    country: req.body.country[i],
                    institute: req.body.institute[i],
                    title: req.body.title[i],
                    major: req.body.major[i],
                    year: req.body.year[i],
                }
                
                arr[index+1] = edu;
                education = arr[index];
            }
            
        }

        if (education.length > 0) user.education = education;

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

exports.updateCertification = async (req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("User Id"),
        certifier: Joi.array().required().label("Certifier"),
        name: Joi.array().required().label("Name"),
        year: Joi.array().required().label("Year")

    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const response = helper.response({ status: 422, error: errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {

        let user = await User.findById(ObjectId(req.body.id));

        const arr = user.certification;
        let index = (arr.length - 1);
        let certification = [];
        if (index === -1) {

            for (let i in req.body.name) {
                let certify = {
                    certifier: req.body.certifier[i],
                    name: req.body.name[i],
                    year: req.body.year[i],
                }
                certification.push(certify);
            }
        } else {
            for(let i in req.body.name) {

                let certify = {
                    certifier: req.body.certifier[i],
                    name: req.body.name[i],
                    year: req.body.year[i],
                }
                
                arr[index+1] = certify;
                certification = arr[index];
            }
            
        }

        if (certification.length > 0) user.certification = certification;

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

