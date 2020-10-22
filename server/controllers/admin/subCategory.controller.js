const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { SubCategory } = require('../../models/SubCategory');
const _ = require('lodash');
var db = require('../../services/model.js');
var helper = require('../../services/helper');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

exports.createSubCategory = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required().label("Name"),
        category: Joi.string().required().label("Category"),
        
    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const response = helper.response({ status: 422, error:errorMessage });

    if (error) return res.status(response.statusCode).json(response);

    try {
        const subcategory = {
            name: req.body.name,
            category: req.body.category,   
        }

        let sub = await db._store(SubCategory, subcategory);

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

exports.updateSubCategory = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required().label("Name"),
        category: Joi.string().required().label("Category"),
        id: Joi.string().required().label("Subcategory Id")
    }).unknown(true);

    const { error } = schema.validate(req.body);

    let errorMessage = {};

    if (error) {
        error.details.forEach(err => {
            errorMessage[err.context.key] = (err.message).replace(/"/g, "")
        })
    }

    const response = helper.response({ status: 422, error:errorMessage });

    if (error) return res.status(response.statusCode).json(response);

    try {
        const subcategory = {
            name: req.body.name,
            category: req.body.category,   
        }

        let sub = await db._update(SubCategory, { _id: req.body.id }, subcategory);

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

exports.deleteSubCategory = async (req, res) => {
    try {
        await db._delete(SubCategory, {"_id":req.params.id});

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
exports.listSubCategory = async (req, res) => {
     try {

        if(!req.query.length) req.query.length = 10;
        else req.query.length = parseInt(req.query.length);
        if(!req.query.page) req.query.page = 1;
        else req.query.page = parseInt(req.query.page);

        let skip = (req.query.page * req.query.length) - req.query.length;

        let subcategories = await db._get(SubCategory, null, null, {limit: req.query.length, skip: skip, populate: "category" });
        let count = await db._count(SubCategory);
        const data = { subcategories };

        const response = helper.response({ data: helper.paginate(req, data, count) });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}
exports.listSubCategorybyid = async (req, res) => {
    try {

        let sub_category = await db._find(SubCategory, {_id:req.params.id});

        const data = { sub_category };

        const response = helper.response({ data: data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.changeStatus = async (req, res) => {
    try {
        const subcategory = {
                status: req.params.status,
        }

        let subcategories = await db._update(SubCategory, { _id: req.params.id }, subcategory);

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