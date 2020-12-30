
const { Setting } = require('./../models/setting');
const { Order } = require('../models/Order');
const { Rating } = require('../models/Rating');
const { SubCategory } = require('../models/SubCategory');
const { Category } = require('../models/category');
const { DeliveryTime } = require('../models/DeliveryTime');
const { Coupon } = require('../models/Coupon');
const { Slide } = require('../models/Slide');
const { Gig } = require('../models/gigs');
const { Menu } = require('../models/Menu');
const { Package } = require('../models/Package');
const { CancelReason } = require('../models/CancelReason');
const { RequestOffer } = require('../models/RequestOffer');
const { Favourite } = require('../models/Favourite');
const { View } = require('../models/View');
const { Page } = require('../models/page');
const { Request } = require("../models/Request");
const Joi = require('@hapi/joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
dotenv.config({ path: __dirname + '/../../.env' });

exports.settings = async (req, res) => {
    try {

        let settings = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });

        const data = settings;

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }
};

exports.sendSms = async (req, res) => {

    try {

        const response = await helper.sendSms({ number: req.body.mobile, message: req.body.message });
        return res.json(response);

    } catch (err) {
        console.log(err);
       return res.status(500).json({status: 500});
    }
};

exports.sendMail = async (req, res) => {
    try {

        const response = await helper.sendMail({to: req.body.to, subject: req.body.subject, message: req.body.message});
        return res.json(response);

    } catch (err) {
        console.log(err);
         return res.status(500).json({status: 500});
    }
};

exports.buyerOrderList = async (req, res) => {
    try {

        let orders = await db._get(Order, {buyer: req.user._id}, {}, {populate: "gig"});

        let delivered_order = await db._get(Order, {buyer: req.user._id, status: "DELIVERED"}, {}, {populate: "gig"});

        let completed_order = await db._get(Order, {buyer: req.user._id, status: "COMPLETED"}, {}, {populate: "gig"});

        let cancelled_order = await db._get(Order, {buyer: req.user._id, status: "CANCELLED"}, {}, {populate: "gig"});

        let active_order = await db._get(Order, {buyer: req.user._id, status:  {$in : ["PROGRESS", "CANCELLATION REQUESTED", "REVISION REQUESTED", "DELIVERED"]}  }, {}, {populate: "gig"});

        const response = helper.response({ data: {"orders": orders, "delivered_order": delivered_order, "completed_order": completed_order, "cancelled_order": cancelled_order, "active_order": active_order } });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.buyerOrderDetails = async (req, res) => {
    try {

        let gig = await db._find(Order, {_id: req.params.id}, {}, { populate: ["gig","seller","buyer"] });

        const data = { gig };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.sellerOrderList = async (req, res) => {
    try {

        let orders = await db._get(Order, {seller: req.user._id}, {}, {populate: "gig"});

        let delivered_order = await db._get(Order, {seller: req.user._id, status: "DELIVERED"}, {}, {populate: "gig"});

        let completed_order = await db._get(Order, {seller: req.user._id, status: "COMPLETED"}, {}, {populate: "gig"});

        let cancelled_order = await db._get(Order, {seller: req.user._id, status: "CANCELLED"}, {}, {populate: "gig"});

        let active_order = await db._get(Order, {seller: req.user._id, status:  {$in : ["PROGRESS", "CANCELLATION REQUESTED", "REVISION REQUESTED", "DELIVERED"]} }, {}, {populate: "gig"});

        const response = helper.response({ data: {"orders": orders, "delivered_order": delivered_order, "completed_order": completed_order, "cancelled_order": cancelled_order, "active_order": active_order } });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.sellerOrderDetails = async (req, res) => {
    try {

        let order = await db._find(Order, {_id: req.params.id}, {}, { populate: ["gig","buyer","seller"] });


        const data = { order };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
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
        expiration: Joi.string().required().label("Expiration")
        
    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    /*const errorResponse = helper.response({ status: 422, error:errorMessage });

    if (error) return res.status(errorResponse.statusCode).json(errorResponse);

    try {*/
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

    /*} catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                return res.status(422).json(err.errors[i].message);
            }
        } else {
            return res.status(422).json(err);
        }
    }*/

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

exports.getFavourites = async (req, res) => {

    try {

        let favourites = await db._get(Favourite, { user: req.user._id }, {}, {populate: ['user', 'gig']});

        const data = { favourites };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.addFavourite = async (req, res) => {
console.log(requestOffer)
   /* try {

        let favourite = await db._find(Favourite, { gig: req.params.id }, {}, {populate: ['user', 'gig']});
        let status;

        if(!favourite) {

            let data = {
                gig: req.params.id, 
                user: req.user._id 
            }
            status = true;
            await db._store(Favourite, data);

            favourite = await db._find(Favourite, { gig: req.params.id }, {}, {populate: ['user', 'gig']});
        } else {
            status = false;
            await db._delete(Favourite, { gig :req.params.id});
        }

        const data = { favourite, status };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }*/

}

exports.getRecent = async (req, res) => {

    try {

        let recent = await db._get(View, { user: req.user._id }, {}, {populate: ['gig']});

        const data = { recent };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.listCancelReason = async (req, res) => {
    try {


        let CancelReasons = await db._get(CancelReason, { status: 1, type: req.params.type });

        const data = { CancelReasons };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.listCancelReason = async (req, res) => {
    try {


        let CancelReasons = await db._get(CancelReason, { status: 1, type: req.params.type });

        const data = { CancelReasons };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.pagesList = async (req, res) => {
    try {

        let type = req.params.type ? (req.params.type).toUpperCase() : '';

        let pages;

        if(req.params.type) {
            pages = await db._get(Page, { status: 1, type: type }, {url: 1, title: 1, type: 1});
        } else {
            pages = await db._get(Page, { status: 1 }, {url: 1, title: 1, type: 1});
        }

        const data = { pages };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.pages = async (req, res) => {
    try {

        let pages = await db._get(Page, { status: 1 });

        const data = { pages };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.page = async (req, res) => {
    try {

        let page = await db._get(Page, { status: 1, url: req.params.page });

        const data = { page };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.orderRating = async (req, res) => {
    try {

        let ratings = await db._find(Rating, {orderId: req.params.id});

        const data = { ratings };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.gigSubCatoegory = async (req, res) => {
    try {

        let gigs = await db._get(Gig, { user: req.user._id }, {select: ['_id', 'category', 'subCategory']}, { populate: [ 
            { path: "category", select: 'name'}, 
            { path: "subCategory", select: 'name'}
            ] });
        const response = helper.response({ data: gigs});
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.requestGigs = async (req, res) => {

    try {

        let gig = await db._get(Gig, { subCategory: req.params.sub });
        let request = await db._get(Request, { _id: req.params.id });
        
        const data = { gig, request };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}