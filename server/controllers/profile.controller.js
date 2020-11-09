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

        let user = await db._get(User, { _id: req.user._id });
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
        description: Joi.string().required().label("Description")
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
        }
        //console.log(JSON.stringify(req.files));

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
        language_id: Joi.array().required().label("Language Id"),
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

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {

        let user = await User.findById(ObjectId(req.body.id));

        let language = [];

        for (let i in req.body.language_id) {
            let lang = {
                language: req.body.language_id[i],
                level: req.body.level[i]
            }
            language.push(lang);
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
        skill_id: Joi.array().required().label("Skill Id"),
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

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {

        let user = await User.findById(ObjectId(req.body.id));

        let skills = [];

        for (let i in req.body.skill_id) {
            let skill = {
                skill: req.body.skill_id[i],
                level: req.body.level[i]
            }
            skills.push(skill);
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
        country_id: Joi.array().required().label("Country Id"),
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

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {

        let user = await User.findById(ObjectId(req.body.id));

        let education = [];

        for (let i in req.body.country_id) {
            let edu = {
                country: req.body.country_id[i],
                institute: req.body.institute[i],
                title: req.body.title[i],
                major: req.body.major[i],
                year: req.body.year[i],
            }
            education.push(edu);
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

        let certification = [];

        for (let i in req.body.name) {
            let certify = {
                certifier: req.body.certifier[i],
                name: req.body.name[i],
                year: req.body.year[i],
            }
            certification.push(certify);
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

exports.listbycategoryToSubCategory = async (req, res) => {

    console.log(req.params.id);
    try {

        var sub_categories = await db._get(SubCategory, { category: req.params.id,  status: 1 });

        const data = { sub_categories };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);
    } catch (err) {
        console.log(err);
    }
}

exports.listDeliveryTime = async (req, res) => {
    try {

        let deliveryTime = await db._get(DeliveryTime, { status: 1 });
        const data = { deliveryTime };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.listCoupon = async (req, res) => {

    try {
        
        let coupons = await db._get(Coupon, { status: 1 });

        const data = { coupons };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.createCoupon = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        code: Joi.string().required().label("Promocode"),
        percentage: Joi.string().required().label("Percentage"),
        maxAmount: Joi.string().required().label("Maximum Amount"),
        description: Joi.string().required().label("Description"),
        expiration: Joi.string().required().label("Expiration"),
        sellerId: Joi.string().required().label("Seller Id")
        
    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const errorResponse = helper.response({ status: 422, error:errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {
        const coupon = {
            code: req.body.code,
            percentage: req.body.percentage,
            maxAmount: req.body.maxAmount,
            description: req.body.description,
            expiration: req.body.expiration,
            sellerId: req.user._id, 
        }

        let coupons = await db._store(Coupon, coupon);

        const response = helper.response({ message: res.__('inserted') });
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

};

exports.listSlide = async (req, res) => {

    try {
        
        let slides = await db._get(Slide, { status: 1 });

        const data = { slides };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.listMenu = async (req, res) => {

    try {
        
        let menus = await db._get(Menu, { status: 1 });

        const data = { menus };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.listPackage = async (req, res) => {
    try {

        let packages = await db._get(Package, { status: 1 });

        const data = { packages };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}



exports.listcategory = async (req, res) => {
    try {


        const categories = await Category.aggregate([

            { "$match": { status: true } },
            { "$project": { name: 1 } },
            {
                "$lookup": {
                    "from": "subcategories",
                    "let": { "id": "$_id" },
                    "pipeline": [
                        {

                            "$match": {
                                "$expr": {
                                    "$and": [
                                        { "$eq": ["$status", true] },
                                        {
                                            "$eq": [
                                                "$$id",
                                                "$category"
                                            ]
                                        }]
                                }

                            },

                        },
                        {
                            "$project": {
                                "name": 1
                            }
                        }
                    ],
                    "as": "subCategories"
                }
            },
            { $match: { "subCategories": { $ne: [] } } }
        ])

        const data = { categories };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}