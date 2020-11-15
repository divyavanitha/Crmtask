const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { Setting } = require('../../models/setting');
const _ = require('lodash');
const db = require('../../services/model.js');
const helper = require('../../services/helper');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

exports.getSetting = async (req, res) => {

    try {

        let settings = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });

        const data = settings;

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

exports.updateGeneral = async (req, res) => {
    
    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Title"),
        /* description: Joi.string().required().label("Description"),
        mobile: Joi.string().required().label("Mobile"),
        email: Joi.string().required().label("Email"),
        copyright: Joi.string().required().label("Copyright") */
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

        let setting = await Setting.findOne();

        if(req.files['logo']) setting.site.logo = req.protocol+ '://' +req.get('host')+"/images/common/" + req.files['logo'][0].filename;
        if(req.files['favicon']) setting.site.favicon = req.protocol+ '://' +req.get('host')+"/images/common/" + req.files['favicon'][0].filename;

        setting.site.title =  req.body.title;
        setting.site.description =  req.body.description;
        setting.site.mobile =  req.body.mobile;
        setting.site.email =  req.body.email;
        setting.site.copyright =  req.body.copyright;
        setting.site.playstoreLink =  req.body.playstore_link;
        setting.site.appstoreLink =  req.body.appstore_link;

        await Setting.updateOne({}, setting, { new: true })

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

exports.updateSocialLink = async (req, res) => {
    
    const schema = Joi.object().options({ abortEarly: false }).keys({
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

        let setting = await Setting.findOne();

        for (let data of Object.keys(req.body)) {
            let indexOfItem = setting.socialLink.findIndex(q => q.name === data);
            let item = setting.socialLink.find(q => q.name === data);
            if(item.url) item.url = req.body[data];
            setting.socialLink[indexOfItem] = item;
        }

        await Setting.updateOne({}, setting, { new: true });

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

exports.updatePush = async (req, res) => {
    
    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Title"),
        /* description: Joi.string().required().label("Description"),
        mobile: Joi.string().required().label("Mobile"),
        email: Joi.string().required().label("Email"),
        copyright: Joi.string().required().label("Copyright") */
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
        const data = {
            title: req.body.title,
            description: req.body.description,
            mobile: req.body.mobile,
            email: req.body.email,
            copyright: req.body.copyright
        }

        let setting = await Setting.findOne();

        if(req.files['logo']) setting.site.logo = req.protocol+ '://' +req.get('host')+"/images/common/" + req.files['logo'][0].filename;
        if(req.files['favicon']) setting.site.favicon = req.protocol+ '://' +req.get('host')+"/images/common/" + req.files['favicon'][0].filename;

        setting.site.title =  req.body.title,
        setting.site.description =  req.body.description,
        setting.site.mobile =  req.body.mobile,
        setting.site.email =  req.body.email,
        setting.site.copyright =  req.body.copyright

        const site = await Setting.updateOne({}, setting, { new: true })

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

exports.updateSocial = async (req, res) => {
    
    const schema = Joi.object().options({ abortEarly: false }).keys({
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

        let setting = await Setting.findOne();

        if(req.body.status != null || req.body.status != "") setting.social.status =  req.body.status;
        if(req.body.facebook_app_id) setting.social.facebookAppId =  req.body.facebook_app_id;
        if(req.body.google_client_id) setting.social.googleClientId =  req.body.google_client_id;
        if(req.body.apple_id) setting.social.appleId =  req.body.apple_id;

        await Setting.updateOne({}, setting, { new: true })

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

exports.updateSms = async (req, res) => {
    
    const schema = Joi.object().options({ abortEarly: false }).keys({
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

        let setting = await Setting.findOne();

        if(req.body.status != null || req.body.status != "")  setting.sms.status =  req.body.status;
        if(req.body.provider) setting.sms.provider =  req.body.provider;
        if(req.body.sid) setting.sms.sid =  req.body.sid;
        if(req.body.token) setting.sms.token =  req.body.token;
        if(req.body.sender) setting.sms.sender =  req.body.sender;

        await Setting.updateOne({}, setting, { new: true })

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

exports.updateMail = async (req, res) => {
    
    const schema = Joi.object().options({ abortEarly: false }).keys({
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

        let setting = await Setting.findOne();

        if(req.body.status != null || req.body.status != "")  setting.mail.status =  req.body.status;
        if(req.body.service) setting.mail.service =  req.body.service;
        if(req.body.username) setting.mail.username =  req.body.username;
        if(req.body.password) setting.mail.password =  req.body.password;
        if(req.body.from) setting.mail.from =  req.body.from;

        await Setting.updateOne({}, setting, { new: true })

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

exports.updatePayment = async (req, res) => {
    
    const schema = Joi.object().options({ abortEarly: false }).keys({
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
        let setting = await Setting.findOne();
        
        setting.payment = req.body.payment;

        await Setting.updateOne({}, setting, { new: true });

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

exports.updateApplication = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        manual_approval: Joi.required().label("Manual Approval"),
        edit_approval: Joi.required().label("Edit Approval"),
        manual_buyer_request_approval: Joi.required().label("Manual Buyer Request Approval"),
        refer_gig: Joi.required().label("Refer Gig") 
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

        let setting = await Setting.findOne();

        setting.application.manualApproval =  req.body.manual_approval;
        setting.application.editApproval =  req.body.edit_approval;
        setting.application.manualBuyerRequestApproval =  req.body.manual_buyer_request_approval;
        setting.application.referGig =  req.body.refer_gig;

        await Setting.updateOne({}, setting, { new: true })

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

exports.updateSeller = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        level_one_rating: Joi.string().required().label("Level One Rating"),
        level_one_completed_order: Joi.string().required().label("Level One Completed Order"),
        level_two_rating: Joi.string().required().label("Level Two Rating"),
        level_two_completed_order: Joi.string().required().label("Level Two Completed Order"),
        top_rated_rating: Joi.string().required().label("Top Rated Rating"),
        top_rated_completed_order: Joi.string().required().label("Top Rated Completed Order")
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

        let setting = await Setting.findOne();

        setting.seller.levelOneRating =  req.body.level_one_rating;
        setting.seller.levelOneCompletedOrder =  req.body.level_one_completed_order;
        setting.seller.levelTwoRating =  req.body.level_two_rating;
        setting.seller.levelTwoCompletedOrder =  req.body.level_two_completed_order;
        setting.seller.topRatedRating =  req.body.top_rated_rating;
        setting.seller.topRatedCompletedOrder =  req.body.top_rated_completed_order;

        await Setting.updateOne({}, setting, { new: true })

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

exports.updateGig = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        minimum_withdrawal_period: Joi.string().required().label("Minimum Withdrawal Period"),
        minimum_gig_price: Joi.string().required().label("Minimum Gig Price"),
        minimum_withdrawal_limit: Joi.string().required().label("Minimum Withdrawal Limit"),
        featured_gig_price: Joi.string().required().label("Featured Gig Price"),
        featured_gig_duration: Joi.string().required().label("Featured Gig Duration"),
        processing_fee: Joi.string().required().label("Processing Fee") 
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

        let setting = await Setting.findOne();

        setting.gig.minimumWithdrawalPeriod =  req.body.minimum_withdrawal_period;
        setting.gig.minimumGigPrice =  req.body.minimum_gig_price;
        setting.gig.minimumWithdrawalLimit =  req.body.minimum_withdrawal_limit;
        setting.gig.featuredGigPrice =  req.body.featured_gig_price;
        setting.gig.featuredGigDuration =  req.body.featured_gig_duration;
        setting.gig.processingFee =  req.body.processing_fee;

        await Setting.updateOne({}, setting, { new: true })

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

exports.updatePricing = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        commission_level_one: Joi.string().required().label("Commission Level One"),
        commission_level_two: Joi.string().required().label("Commission Level Two"),
        commission_top_rated: Joi.string().required().label("Commission Top Rated"),
        commission: Joi.string().required().label("Commission") 
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

        let setting = await Setting.findOne();

        setting.pricing.commissionLevelOne =  req.body.commission_level_one;
        setting.pricing.commissionLevelTwo =  req.body.commission_level_two;
        setting.pricing.commissionTopRated =  req.body.commission_top_rated;
        setting.pricing.commission =  req.body.commission;

        await Setting.updateOne({}, setting, { new: true })

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
