const express = require("express");
const { User } = require("../../models/user");
const { Gig } = require('../../models/gigs');
const { Category } = require('../../models/category');
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
        let active_count = await db._count(Gig, {status: "ACTIVE"});
        let pending_count = await db._count(Gig, {status: "PENDING" });
        let paused_count = await db._count(Gig, {status: "PAUSED"});
        let featured_count = await db._count(Gig, {featured: true });
        let all_count = await db._count(Gig, {status: {$ne : "DRAFT"}});

        if((req.query.type).toUpperCase() == "ACTIVE"){
            gigs = await db._get(Gig, {status: "ACTIVE"}, {}, {populate: "category"});
            count = active_count;
        }else if((req.query.type).toUpperCase() == "PENDING"){
            gigs = await db._get(Gig, {status: "PENDING" }, {}, {populate: "category"});
            count = pending_count;
        }else if((req.query.type).toUpperCase() == "PAUSED"){
            gigs = await db._get(Gig, {status: "PAUSED" }, {}, {populate: "category"});
            count = paused_count;
        }else if((req.query.type).toUpperCase() == "FEATURED"){
            gigs = await db._get(Gig, { featured: true }, {}, {populate: "category"});
            count = featured_count;
        }else{
            gigs = await db._get(Gig, {status:  {$ne : "DRAFT"} }, {} , {populate: "category"});
            count = all_count;
        }

        
        const data = { gigs };
        const response = helper.response({ data:  { gigs : helper.paginate(req, data, count), active_count: active_count, pending_count: pending_count, paused_count: paused_count, featured_count: featured_count, all_count: all_count }  });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}