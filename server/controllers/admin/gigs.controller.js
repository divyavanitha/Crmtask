const express = require("express");
const { User } = require("../../models/user");
const { Gig } = require('../../models/gigs');
const { Category } = require('../../models/category');
const { Order } = require('../../models/Order');
const { SubCategory } = require('../../models/SubCategory');
const helper = require('../../services/helper.js');
const db = require('../../services/model.js');
const Joi = require('@hapi/joi');
const _ = require('lodash');


exports.listgigs = async (req, res) => {
    try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;

        let count, gigs;
        let active_count = await db._count(Gig, {status: "ACTIVE" , deleted_at: null});
        let pending_count = await db._count(Gig, {status: "PENDING", deleted_at: null });
        let paused_count = await db._count(Gig, {status: "PAUSE", deleted_at: null});
        let featured_count = await db._count(Gig, {featured: true , status: "ACTIVE", deleted_at: null });
        let all_count = await db._count(Gig, {status: {$nin : ["DRAFT", "MODIFICATION"]} , deleted_at: null});

        if((req.query.type).toUpperCase() == "ACTIVE"){
            gigs = await db._get(Gig, {status: "ACTIVE", deleted_at: null}, {}, {populate: ["category", "user"]});
            count = active_count;
        }else if((req.query.type).toUpperCase() == "PENDING"){
            gigs = await db._get(Gig, {status: "PENDING", deleted_at: null }, {}, {populate: ["category", "user"]});
            count = pending_count;
        }else if((req.query.type).toUpperCase() == "PAUSE"){
            gigs = await db._get(Gig, {status: "PAUSE", deleted_at: null }, {}, {populate: ["category", "user"]});
            count = paused_count;
        }else if((req.query.type).toUpperCase() == "FEATURED"){
            gigs = await db._get(Gig, { featured: true, status: "ACTIVE", deleted_at: null }, {}, {populate: ["category", "user"]});
            count = featured_count;
        }else{
            gigs = await db._get(Gig, {status:  {$nin : ["DRAFT", "MODIFICATION"]}, deleted_at: null }, {} , {populate: ["category", "user"]});
            count = all_count;
        }

        
        const data = { gigs };
        const response = helper.response({ data:  { gigs : helper.paginate(req, data, count), active_count: active_count, pending_count: pending_count, paused_count: paused_count, featured_count: featured_count, all_count: all_count }  });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.gigStatus = async (req, res) => {
    try {

        let gig = await db._find(Gig, {_id:req.params.id});
        
        if((req.params.status).toUpperCase() == "ADD_FEATURE"){
            gig.featured = true;
        }else if((req.params.status).toUpperCase() == "REMOVE_FEATURE"){
            gig.featured = false;
        }else if((req.params.status).toUpperCase() == "PAUSE"){
            gig.status = "PAUSE";
        }else if((req.params.status).toUpperCase() == "UNPAUSE"){
            gig.status = "ACTIVE";
        }else if((req.params.status).toUpperCase() == "APPROVE"){
            gig.status = "ACTIVE";
        }else if((req.params.status).toUpperCase() == "DECLINE"){
            gig.status = "INACTIVE";
        }

        let gigs = await db._update(Gig, { _id: req.params.id }, gig);

        const response = helper.response({ message: res.__('updated') });
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

exports.deleteGig = async (req, res) => {
    try {
        console.log(new Date());
        let gig ={
        deleted_at: new Date()
        }
        await db._update(Gig, { _id: req.params.id }, gig);
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

exports.getGigDetails = async (req, res) => {

    try {

        let gig = await db._find(Gig, {_id: req.params.id});


        const data = { gig };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.requestModification = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        modify_description: Joi.string().required().label("Description"),
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
        const gig = {
            modify_description: req.body.modify_description,
            status: "MODIFICATION" 
        }

         await db._update(Gig, { _id: req.body.id }, gig);

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