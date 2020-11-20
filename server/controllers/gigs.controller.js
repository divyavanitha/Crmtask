const express = require("express");
const { User } = require("../models/user");
const { Gig } = require('../models/gigs');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');


exports.withoutAuthgigs = async (req, res) => {
    try {

        let gigs = await db._get(Gig, {}, {}, {populate: "user"});

        const data = { gigs };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.getGigDetails = async (req, res) => {
    try {

        //let gig = await db._find(Gig, {_id: req.params.id}, {}, { populate: [ { path: "user", populate: { path: 'country', model: 'Country' } } ] } );
        let gig = await db._find(Gig, {_id: req.params.id}, {}, { populate: "user" });


        const data = { gig };

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

exports.listgigs = async (req, res) => {
    try {

        let gigs = await db._get(Gig, { user: req.user._id });

        const data = { gigs };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.creategigs = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        title: Joi.string().required().label("Title"),
        //category_id: Joi.string().required().label("Category Id"),
        sub_category_id: Joi.string().required().label("Sub Category Id"),
        tags: Joi.string().required().label("Tags")

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

    let existingGig = await Gig.findOne({ title: req.body.title });
    if (existingGig) return res.status(422).json( helper.response(  { status: 422, message: 'Gig name already exists'  }   ));

    try {

        let data = {
                user: req.user._id,
                title: req.body.title,
                category: req.body.sub_category_id,
                subCategory: req.body.sub_category_id,
                tags: req.body.tags
            }

        let gig = await db._store(Gig, data);

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

    console.log(req.body);
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
                    //package: req.body.package_id[i],
                    description: req.body.description[i],
                    revisions: req.body.revisions[i],
                    price: req.body.price[i],
                    DeliveryTime: req.body.delivery_time_id[i],
                    //fixed_price: 1
                }
            }else{
                var price = {
                    package: req.body.package_id[i],
                    description: req.body.description[i],
                    revisions: req.body.revisions[i],
                    price: req.body.price[i],
                    DeliveryTime: req.body.delivery_time_id[i],
                    //fixed_price: 0
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

exports.updateFaq = async(req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        question: Joi.array().required().label("Question"),
        answer: Joi.array().required().label("Answer"),
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

        let faqs = [];

        for(let i in req.body.question) {
            let faq = {
                question: req.body.question[i],
                answer: req.body.answer[i] 
            }
            faqs.push(faq);
        }

        if(faqs.length > 0) gig.faq = faqs;
        gig.description = req.body.description;
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
console.log(gig);
        let gigs = await db._update(Gig, { _id: req.body.id }, gig);
//console.log(gigs);

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

        for(i in req.files['photo[]']) {

            let image = {
                photo: req.protocol+ '://' +req.get('host')+"/images/gig/"+(req.files['photo[]'][i].filename),
               
            }
            photos.push(image);
             
        }

        if(photos.length > 0) gig.photo = photos;

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

        let gigs = await db._update(Gig, { _id: req.body.id }, gig);
//console.log(gigs);

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
exports.getallgigs = async (req, res) => {
    const errors = {};

    Gig.find()
        .then(gigs => {
            if (!gigs) {
                errors.nogigs = 'There are no gigs';
                return res.status(404).json(errors);
            }

            res.json({ gigs });
        })
        .catch(err => res.status(404).json({ gigs: 'There are no gigs' }));
}
exports.getallyourgigs = async (req, res) => {
    const errors = {};
    Gig.find()
        .populate({
            path: 'user',
            match: { _id: { $eq: req.user._id } }
        }
        )
        .then(gig => {
            if (!gig) {

                errors = 'There are no gig';
                return res.status(404).json(errors);
            }
            for (let i = 0; i <= gig.length; i++) {
                let gigs = gigs.filter(gigg => gigg.user !== null)
            }
            res.json({ gigs });
        })
        .catch(err => res.status(404).json({ gigs: 'There are no postjob for user' }));


}
exports.findgigbyid = async (req, res) => {
    const errors = {};
 console.log("Findbyid");
    Gig.findById(req.params.gigid)
        // .populate('user')
        .then(gigs => {
            if (!gigs) {
                errors.noprofile = 'There is no gigs';
                return res.status(404).json(errors);
            }
            res.json(gigs);
        })
        .catch(err => res.status(404).json(err));
}
exports.Extragigs = async (req, res) => {
    // const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }
    const gig = await Gig.findOne({ user: req.user.id })
    const newExtragigs = req.body;
    // console.log("newExtragigs",newExtragigs);
    // console.log("gig",gig);
    // Add to exp array
    gig.myextragigs = [];
    console.log("Extragigs: ", newExtragigs)
    const gigextra = gig.myextragigs.unshift(newExtragigs);
    // const gigextra=gig.myextragigs.unshift(newExtragigs);
    console.log("gigextra", gigextra);
    console.log("gig.myextragigs", gig.myextragigs
    );

    const gigexp = gig.myextragigs;

    await Gig.findByIdAndUpdate(gig.id, { myextragigs: gigexp }).then((err, data) => {
        if (err) return res.json({ err })
        res.json(
            { data })

    }
    );
}


