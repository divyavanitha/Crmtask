const express = require("express");
const { Card } = require('../models/Card');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
const { Gig } = require('../models/gigs');
const Joi = require('@hapi/joi');
const _ = require('lodash');

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

exports.addCard = async (req, res) => {
    try {

        const customerToken = await stripe.tokens.create({
          card: {
            name: "Test",
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2021,
            cvc: '314',
          },
        });

        const customer = await stripe.customers.create({
            source: customerToken.id,
        });

        /*var cardData = {
                    name: req.body.name,
                    user: req.user._id,
                    funding: customer.sources.data[0].funding,
                    last_four: customer.sources.data[0].last_four,
                    brand: customer.sources.data[0].brand,
                    card_id: customer.sources.data[0].id,
                    customer_id: customer.sources.data[0].customer,
                    year: customer.sources.data[0].year,
                    isDefault: req.body.isDefault
                }

        var card = await db._store(Card, cardData);*/

        const data = {  customer };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}


exports.addPayoutCard = async (req, res) => {
    try {


        const accountToken = await stripe.tokens.create({
          card: {
            name: "Test",
            number: '4000056655665556',
            exp_month: 12,
            exp_year: 2021,
            cvc: '314',
            currency: 'USD',
          },
        });

        const account = await stripe.accounts.create({
          type: 'custom',
          country: 'US',
          email: 'jenny.rosen@example.com',
          external_account: accountToken.id,
          capabilities: {
            card_payments: {requested: true},
            transfers: {requested: true},
          },
        });

        const data = {  account };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.removeCard = async (req, res) => {
    try {

        const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

        const deleted = await stripe.customers.del(
          'acct_1I5XnP2f470wrgp9'
        );

        const data = { deleted };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}

exports.removePayoutCard = async (req, res) => {
    try {

        const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

        const deleted = await stripe.accounts.del(
          'acct_1I5XnP2f470wrgp9'
        );

        const data = { deleted };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}


exports.addMoney = async (req, res) => {
    try {

        const charge = await stripe.charges.create({
          amount: 1500,
          currency: "usd",
          source: "{{CONNECTED_STRIPE_ACCOUNT_ID}}"
        });

        const data = {  customer };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}


exports.payout = async (req, res) => {
    try {

        const payout = await stripe.payouts.create({
          amount: 1000,
          currency: 'usd',
        }, {
          stripeAccount: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
        });

        const data = {  customer };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}


exports.refund = async (req, res) => {
    try {

        const refund = await stripe.refunds.create({
          amount: 1000,
          payment_intent: 'pi_Aabcxyz01aDfoo',
        });

        const data = {  customer };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }

}