const express = require('express');
const { Admin, validate } = require('../../models/admin');

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { Package } = require('../../models/Package');
const _ = require('lodash');
const bcrypt = require('bcrypt');
var db = require('../../services/model.js');
var helper = require('../../services/helper');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

exports.createPackage = async (req, res) => {
    const schema = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required().label("Name"),
        
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
        const package = {
            name: req.body.name,
        }

        let packages = await db._store(Package, package);

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
exports.deletePackage = async (req, res) => {
    try {
        await db._delete(Package, {"_id":req.params.id});

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
exports.listPackage = async (req, res) => {
    try {

        let packages = await db._get(Package);

        const data = { packages };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.updatePackage = async (req, res) => {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required().label("Package Id"),
        name: Joi.string().required().label("Name"),
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
        const package = {
                name: req.body.name,
        }

        let packages = await db._update(Package, { _id: req.body.id }, package);

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
exports.listPackagebyid = async (req, res) => {
    try {
    const errors = {};
    Category.findOne({id: req.params.id})
    .then(category => {
        if (!category) {
            errors.noCategory = 'There are no Category';
            return res.status(404).json(errors);
        }

        res.json({category});
    })
    }    catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(422).send(err);
        }
    }

}