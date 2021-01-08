const express = require("express");
const { Card } = require('../models/Card');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
const { Setting } = require('./../models/setting');
const { Gig } = require('../models/gigs');
const { User } = require('../models/user');
const Joi = require('@hapi/joi');
const Stripe = require('stripe');
const _ = require('lodash');



exports.addCard = async (req, res) => {
    try {


 let setting = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });
        let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');

        let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';
        
const stripe = require('stripe')(secret_key);

const customer = await stripe.customers.retrieve(
  'cus_IiML7Z7ajc3y8S'
);

return res.status(200).json(customer);
    /*    let setting = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });
        let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');

        let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';

        if(secret_key) {
            const stripe = require('stripe')(secret_key);

            const customerToken = await stripe.tokens.create({
              card: {
                name: req.body.name,
                number: req.body.number,
                exp_month: req.body.exp_month,
                exp_year: req.body.exp_year,
                cvc: req.body.cvc,
              },
            });

            const customer = await stripe.customers.create({
                source: customerToken.id,
            });
console.log(customer)
            const cardData = {
                        name: req.body.name,
                        user: req.user._id,
                        funding: customer.sources.data[0].funding,
                        lastFour: customer.sources.data[0].last4,
                        brand: customer.sources.data[0].brand,
                        cardId: customer.sources.data[0].id,
                        customerId: customer.sources.data[0].customer,
                        isDefault: req.body.default
                    }

            const card = await db._store(Card, cardData);

            const data = {  card };

            const response = helper.response({ data });
            return res.status(response.statusCode).json(response);
        }*/

        

    } catch (err) {
        console.log(err);
    }

}


exports.addPayoutCard = async (req, res) => {
    try {

        let setting = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });
        let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');
        
        if(stripePayment) {
            let currency = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'currency')[0].value : '';
            let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';
            if(currency && secret_key) {
                const stripe = Stripe(secret_key);
                const accountToken = await stripe.tokens.create({
                  card: {
                    name: req.body.name,
                    number: req.body.number,
                    exp_month: req.body.exp_month,
                    exp_year: req.body.exp_year,
                    cvc: req.body.cvc,
                    currency: currency
                  },
                });

                const account = await stripe.accounts.create({
                  type: 'custom',
                  country: 'US',
                  email: req.user.email,
                  external_account: accountToken.id,
                  capabilities: {
                    card_payments: {requested: true},
                    transfers: {requested: true},
                  },
                });


                const cardData = {
                            name: req.body.name,
                            user: req.user._id,
                            funding: accountToken.card.funding,
                            lastFour: accountToken.card.last4,
                            brand: accountToken.card.brand,
                            cardId: accountToken.card.id,
                            customerId: account.id,
                            isDefault: req.body.default
                        }

                const user = await db._find(User, { _id: req.user._id });

                let existingCard = await db._find(Card, { customerId: user.stripeId });

                let data;

                if(existingCard) {

                    await db._update(Card, { customerId: user.stripeId }, cardData);
                    const card = await db._find(Card, { cardId: accountToken.card.id });
                    data = { card };

                } else {

                    const card = await db._store(Card, cardData);
                    data = { card };
                }

                user.stripeId = account.id;

                await db._update(User, { _id: req.user._id }, user);

                const response = helper.response({ data });

                return res.status(response.statusCode).json(response);
            } else {

                const errorResponse = helper.response({ status: 500, error: 'Currency not available!' });

                return res.status(errorResponse.statusCode).json(errorResponse);
            }
        }
        


    } catch (err) {
        console.log(err);
    }

}

exports.removeCard = async (req, res) => {
    try {

        let setting = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });
        let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');

        let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';

        if(secret_key) {
            const stripe = Stripe(secret_key);

            let card = await db._find(Card, { _id: req.body.id });

            const deleted = await stripe.customers.del(
              card.customerId
            );

            if(deleted.deleted) await db._delete(Card, {_id: req.body.id });

            const response = helper.response({ message: res.__('deleted') });
            return res.status(response.statusCode).json(response);
        }

    } catch (err) {
        console.log(err);
    }

}

exports.removePayoutCard = async (req, res) => {
    try {

        let setting = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });
        let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');

        let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';

        if(secret_key) {
            const stripe = Stripe(secret_key);

            let card = await db._find(Card, { _id: req.body.id });

            const deleted = await stripe.accounts.del(
              card.customerId
            );

            if(deleted.deleted) await db._delete(Card, {_id: req.body.id });

            const response = helper.response({ message: res.__('deleted') });
            return res.status(response.statusCode).json(response);
        }

    } catch (err) {
        console.log(err);
    }

}


exports.addMoney = async (req, res) => {
    try {

        let card = await db._find(Card, { _id: req.body.id });

        let setting = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });
        let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');
        
        if(stripePayment) {
            let currency = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'currency')[0].value : '';
            let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';
            if(currency && secret_key) {
                const stripe = Stripe(secret_key);
                const charge = await stripe.charges.create({
                  amount: req.body.amount*100,
                  currency: currency,
                  customer: card.customerId
                });

                let response;

                if(charge.status == 'succeeded') {

                    const user = await db._find(User, { _id: req.user._id });

                    user.wallet += parseFloat(req.body.amount);

                    await db._update(User, { _id: req.user._id }, user);

                    data = { wallet: user.wallet, amount: parseFloat(req.body.amount) };
                    response = helper.response({ data: data, message: "Amount successfully added to wallet!" });

                } else {
                    response = helper.response({ status: 500, message: 'Payment Failed!' });
                }

                return res.status(response.statusCode).json(response);
            } else {

                const errorResponse = helper.response({ status: 500, error: 'Currency not available!' });

                return res.status(errorResponse.statusCode).json(errorResponse);
            }
        }

        

    } catch (err) {
        console.log(err);
    }

}


exports.payout = async (req, res) => {
    try {

        let card = await db._find(Card, { _id: req.body.id });

        let setting = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });
        let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');
        
        if(stripePayment) {
            let currency = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'currency')[0].value : '';
            let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';
            if(currency && secret_key) {
                const stripe = Stripe(secret_key);
                const payout = await stripe.payouts.create({
                  amount: req.body.amount,
                  currency: currency,
                }, {
                  stripeAccount: card.customerId,
                });

                const data = {  payout };

                const response = helper.response({ data });
                return res.status(response.statusCode).json(response);
            } else {

                const errorResponse = helper.response({ status: 500, error: 'Currency not available!' });

                return res.status(errorResponse.statusCode).json(errorResponse);
            }
        }

        

    } catch (err) {
        console.log(err);
    }

}


exports.refund = async (req, res) => {
    try {
        let setting = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });
        let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');

        let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';

        if(secret_key) {
            const stripe = Stripe(secret_key);
            const refund = await stripe.refunds.create({
              amount: 1000,
              payment_intent: 'pi_Aabcxyz01aDfoo',
            });

            const data = {  customer };

            const response = helper.response({ data });
            return res.status(response.statusCode).json(response);
        }

    } catch (err) {
        console.log(err);
    }

}