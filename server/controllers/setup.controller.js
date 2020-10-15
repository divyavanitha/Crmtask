// const express = require('express');
const { Setup, validate } = require('../models/setup');

// const mongoose = require('mongoose');
// const Joi = require('@hapi/joi');
// const _ = require('lodash');
// const bcrypt = require('bcrypt');
// const helper = require('../services/helper');

exports.addSetup = async (req, res) => {

    try {

        const { error } = validate(req.body);
        const errors = {};
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = (err.message).replace(/"/g, "");
            }
        }

        if (error) return res.status(422).json(errors);

        const setup = new Setup({
            appname: req.body.appname,
            apptitle: req.body.apptitle

        });
        console.log(setup)
        await setup.save().then(data => {
            res.send(data);
        })

    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(500).send({ error: err.name });
        }
    }

};
exports.getAllSetup = async (req, res) => {

    try {

        await Setup.find().then(data => {
            res.send(data);
        })

    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(500).send({ error: err.name });
        }
    }

};
exports.getByIdSetup = async (req, res) => {

    try {

        await Setup.findById(req.params.setupId).then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.setupId
                });
            }
            res.send(data);
        })

    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(500).send({ error: err.name });
        }
    }

};
exports.updateSetup = async (req, res) => {

    try {

        await Setup.findByIdAndUpdate(req.params.setupId, { appname: req.body.appname, apptitle: req.body.apptitle },
            { new: true }
        ).then(data => {
            if (!data) {
                return res.status(404).send({
                    message: " id Not found " + req.params.setupId
                });
            }
            res.send(data);
        })

    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(500).send({ error: err.name });
        }
    }

};
exports.deleteSetup = async (req, res) => {

    try {

        await Setup.findByIdAndRemove(req.params.setupId
        ).then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "  id is not found " + req.params.setupId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        })

    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(500).send({ error: err.name });
        }
    }

};