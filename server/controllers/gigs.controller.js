const express = require("express");
const { User } = require("../models/user");
const { Gig } = require('../models/gigs');
const { Order } = require('../models/Order');
const { Rating } = require('../models/Rating');
const { Category } = require('../models/category');
const { SubCategory } = require('../models/SubCategory');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');


exports.listgigs = async (req, res) => {
    try {

        let projection = {};

        if(req.query.category) {
            let category = await db._find( Category, {name: req.query.category}, {_id: 1} );
            projection.category = category._id;
        }

        if(req.query.subcategory) {
            let subcategory = await db._find(SubCategory, {name: req.query.subcategory}, {_id: 1} );
            projection.subCategory = subcategory._id;
        }

        projection.status = 'ACTIVE';

        let gigs = await db._get(Gig, projection, {}, {populate: "user"});

        const data = { gigs };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.getGigDetails = async (req, res) => {

    try {

        let gig = await db._find(Gig, {_id: req.params.id}, {}, { populate: [ 
            { path: "user", populate: { path: 'country', model: 'Country', select: 'name' } }, 
            { path: "user", populate: { path: 'city', model: 'city', select: 'name' } }, 
            { path: "category", select: 'name'}, 
            { path: "subCategory", select: 'name'}
            ] });

        let orderCount = await db._count(Order, {gig: gig._id, status:  {$in : ["Progress", "Cancellation Requested", "Revision Requested"]}  });

        let reviews = await db._get(Rating, {gig: gig._id }, { sellerRating: 1, buyerRating: 1, buyerComment: 1, sellerComment: 1} );

        const data = { gig, orderCount, reviews };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.getGigDetailByName = async (req, res) => {

    try {

        let gig = await db._find(Gig, {title: req.params.title}, {}, { populate: [ 
            { path: "user", populate: { path: 'country', model: 'Country', select: 'name' } }, 
            { path: "user", populate: { path: 'city', model: 'city', select: 'name' } }, 
            { path: "category", select: 'name'}, 
            { path: "subCategory", select: 'name'}
            ] });

        let orderCount = await db._count(Order, {gig: gig._id, status:  {$in : ["Progress", "Cancellation Requested", "Revision Requested"]}  });

        let reviews = await db._get(Rating, {gig: gig._id }, { sellerRating: 1, buyerRating: 1, buyerComment: 1, sellerComment: 1, seller_at: 1, buyer_at: 1}, { populate: [{path: 'seller', select: 'firstName lastName profilePhoto -_id'}, {path: 'buyer', select: 'firstName lastName profilePhoto -_id'}] } );

        const data = { gig, orderCount, reviews };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}


exports.getPackage = async (req, res) => {
    try {

        let gig = await db._find(Gig, {_id: req.params.id});

        const data = { gig };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.usergigs = async (req, res) => {
    try {

        let active_gigs = await db._get(Gig, { user: req.user._id, status: "ACTIVE" });
        let inactive_gigs = await db._get(Gig, { user: req.user._id, status: "INACTIVE" });
        let draft_gigs = await db._get(Gig, { user: req.user._id, status: "DRAFT" });
        let pending_gigs = await db._get(Gig, { user: req.user._id, status: "PENDING" });
        let modification_gigs = await db._get(Gig, { user: req.user._id, status: "MODIFICATION" });
        let paused_gigs = await db._get(Gig, { user: req.user._id, status: "PAUSED" });
        let featured_gigs = await db._get(Gig, { user: req.user._id, featured: true });

        //const data = { gigs };

        const response = helper.response({ data: {"active": active_gigs, "inactive": inactive_gigs, "draft": draft_gigs, "pending": pending_gigs, "modification": modification_gigs, "paused": paused_gigs, "featured": featured_gigs } });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.creategigs = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Title"),
        category_id: Joi.string().required().label("Category Id"),
        sub_category_id: Joi.string().required().label("Sub Category Id"),
        tags: Joi.array().required().label("Tags")

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

    if(!req.body.id) {
        let existingGig = await Gig.findOne({ title: req.body.title });
        if (existingGig) return res.status(422).json( helper.response(  { status: 422, message: 'Gig name already exists'  }   ));
    }

    try {

        let tags = [];
        let gig;
        
        for(i in req.body.tags) {

            let tag = req.body.tags[i]
            
            tags.push(tag);
             
        }

        let data = {
                user: req.user._id,
                title: req.body.title,
                category: req.body.category_id,
                subCategory: req.body.sub_category_id,
                tags: tags
            }

        if(req.body.id) {
            await db._update(Gig, { _id: req.body.id }, data);
            gig = await db._find( Gig, {_id: req.body.id} );
        } else {
            data.status = "DRAFT";
            gig = await db._store(Gig, data);
        }

        const response = helper.response({ message: res.__('inserted'), data: gig });
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

exports.updatePricing = async(req, res) => {

    
    const schema = Joi.object().options({ abortEarly: false }).keys({
        //package_id: Joi.array().required().label("Package Id"),
        delivery_time_id: Joi.array().required().label("Delivery Time Id"),
        revisions: Joi.array().required().label("Revisions"),
        price: Joi.array().required().label("Price"),
        id: Joi.string().required().label("Gig Id"),
        //fixed_price: Joi.boolean().required().label("Fixed")

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

        let gig = await Gig.findById(req.body.id);

        let pricing = [];
        console.log('gig',req.body);
        for(let i in req.body.price) {
            if(req.body.fixed_price == 1){
                var price = {                  
                    revisions: req.body.revisions[i],
                    price: req.body.price[i],
                    DeliveryTime: req.body.delivery_time_id[i],                   
                }
            }else{
                var price = {
                    package: req.body.package_id[i],
                    description: req.body.description[i],
                    revisions: req.body.revisions[i],
                    price: req.body.price[i],
                    DeliveryTime: req.body.delivery_time_id[i],
                }
            }
            pricing.push(price);
        }
        
        if(pricing.length > 0) gig.pricing = pricing;
        gig.fixed_price = req.body.fixed_price;
        
        let gigs = await db._update(Gig, { _id: req.body.id }, gig);

        const response = helper.response({ message: res.__('updated'), data: gig });
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

exports.faq = async(req, res) => {

    if(req.body.action == "faq"){
        var schema = Joi.object().options({ abortEarly: false }).keys({
            question: Joi.array().required().label("Question"),
            answer: Joi.array().required().label("Answer"),
            id: Joi.string().required().label("Gig Id")

        }).unknown(true);
    }else{
        var schema = Joi.object().options({ abortEarly: false }).keys({
            description: Joi.string().required().label("Description"),
            id: Joi.string().required().label("Gig Id")

        }).unknown(true);
    }
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

        let gig = await Gig.findById(req.body.id);
        const arr = gig.faq;
        let index = (arr.length - 1);//arr.findIndex((e) => e._id); //e.id === obj.id
        let faqs = [];
        console.log('index',index);
        if (index === -1) {
            for(let i in req.body.question) {
                let faq = {
                    question: req.body.question[i],
                    answer: req.body.answer[i] 
                }
                faqs.push(faq);
            }
        } else {
            for(let i in req.body.question) {
                let faq = {
                    question: req.body.question[i],
                    answer: req.body.answer[i] 
                }
                arr[index+1] = faq;
                faqs = arr[index];
            }
            
        }

        if(faqs.length > 0) gig.faq = faqs;
        gig.description = req.body.description;
        let updated_gig = await Gig.findById(gig._id);
        let gigs = await db._update(Gig, { _id: req.body.id }, gig);

        const response = helper.response({ message: res.__('updated'), data: gig });
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

exports.updateFaq = async(req, res) => {
    //console.log(req.body);
    if(req.body.action == "faq"){
        var schema = Joi.object().options({ abortEarly: false }).keys({
            question: Joi.string().required().label("Question"),
            answer: Joi.string().required().label("Answer"),
            id: Joi.string().required().label("Gig Id"),
            faq_id: Joi.string().required().label("Faq Id"),

        }).unknown(true);
    }else{
        var schema = Joi.object().options({ abortEarly: false }).keys({
            description: Joi.string().required().label("Description"),
            id: Joi.string().required().label("Gig Id")

        }).unknown(true);
    }
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

        let gig = await Gig.findById(req.body.id);
        const arr = gig.faq;
        //let index = (arr.length - 1);

        let index = arr.find(x => x.id === req.body.faq_id); //e.id === obj.id
        console.log(index);
            //let faqs = [];
//console.log('index',index);
        /*if (index === -1) {
            for(let i in req.body.question) {*/
                let faq = {
                    question: req.body.question,
                    answer: req.body.answer 
                }

                //faqs.push(faq);
            /*    
            }
        } else {
            for(let i in req.body.question) {
                let faq = {
                    question: req.body.question[i],
                    answer: req.body.answer[i] 
                }
                arr[index+1] = faq;
                faqs = arr[index];
            }
            
        }*/
        index = faq;
        gig.faq = index;
        gig.description = req.body.description;
        let updated_gig = await Gig.findById(gig._id);
        let gigs = await db._update(Gig, { _id: req.body.id }, gig);

        const response = helper.response({ message: res.__('updated'), data: gig });
        return res.status(response.statusCode).json(response);

   /* } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                return res.status(422).json(err.errors[i].message);
            }
        } else {
            return res.status(422).json(err);
        }
    }*/
}

exports.deleteFaq = async(req, res) => {
    console.log(req.body);
    
}

exports.updateRequirement = async(req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        requirement: Joi.string().required().label("Rquirement"),
        id: Joi.string().required().label("Gig Id")

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

        let gig = await Gig.findById(req.body.id);

        gig.requirement = req.body.requirement;
        let gigs = await db._update(Gig, { _id: req.body.id }, gig);
        const response = helper.response({ message: res.__('updated'), data: gig });
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

exports.updateImage = async(req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("Gig Id")

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

        let gig = await Gig.findById(req.body.id);

        let photos = [];
        console.log('files',req.files);
        for(i in req.files['photo[]']) {

            let image = {
                photo: req.protocol+ '://' +req.get('host')+"/images/gig/"+(req.files['photo[]'][i].filename),
               
            }
            photos.push(image);
             
        }

        if(photos.length > 0) gig.photo = photos;

        let gigs = await db._update(Gig, { _id: req.body.id }, gig);

        const response = helper.response({ message: res.__('updated'), data: gig });
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

exports.updateConfirm = async(req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("Gig Id")
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

        let gig = await Gig.findById(req.body.id);
         gig.proposal = req.body.proposal;
         gig.status = "PENDING";
        let gigs = await db._update(Gig, { _id: req.body.id }, gig);
        const response = helper.response({ message: res.__('updated'), data: gigs });
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

exports.deleteGig = async (req, res) => {
    try {
        await db._delete(Gig, {"_id":req.params.id});

        const response = helper.response({ message: res.__('deleted') });
        return res.status(response.statusCode).json(response);
    }
    catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(422).send(err);
        }
    }

};



