const express = require("express");
const { Card } = require('../models/Card');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
const { Setting } = require('./../models/setting');
const { Gig } = require('../models/gigs');
const { User } = require('../models/user');
const { PaymentLog } = require('../models/PaymentLog');
const Joi = require('@hapi/joi');
const Stripe = require('stripe');
const _ = require('lodash');

exports.getCard = async (req, res) => {
    try {


        let cards = await db._get(Card, {user: req.user._id, type: 'CHARGE'}, {isDefault : 1, funding : 1, brand : 1, lastFour : 1 });

        const data = {  cards };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

        

    } catch (err) {
        console.log(err);
    }

}

exports.getPayoutCard = async (req, res) => {
    try {


        let cards = await db._find(Card, {user: req.user._id, type: 'PAYOUT'}, {isDefault : 1, funding : 1, brand : 1, lastFour : 1 });

        const data = {  cards };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

        

    } catch (err) {
        console.log(err);
    }

}

exports.addCard = async (req, res) => {
    try {
        let setting = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });
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

            let cards = await db._count(Card, {user: req.user._id, type: 'CHARGE'});

            let defaultCard = await db._find(Card, {user: req.user._id, type: 'CHARGE', isDefault: true });

            let isDefault;

            if(defaultCard){
                isDefault = false;
            }else{
                isDefault = true;
            }

            const cardData = {
                        name: req.body.name,
                        user: req.user._id,
                        funding: customer.sources.data[0].funding,
                        lastFour: customer.sources.data[0].last4,
                        brand: customer.sources.data[0].brand,
                        cardId: customer.sources.data[0].id,
                        customerId: customer.sources.data[0].customer,
                        type: 'CHARGE',
                        isDefault: isDefault
                    }

            const existingCard = await db._find(Card, {user: req.user._id, lastFour: customer.sources.data[0].last4});

            if(existingCard) {

                const errorResponse = helper.response({ status: 422, message: 'Card already available!' });

                return res.status(errorResponse.statusCode).json(errorResponse);
            }

            await db._store(Card, cardData);
            let card = await db._get(Card, {user: req.user._id, type: 'CHARGE'}, {isDefault : 1, funding : 1, brand : 1, lastFour : 1 });
            const data = {  card };

            const response = helper.response({ data, message: res.__('card_added') });
            return res.status(response.statusCode).json(response);
        }

        

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

                let existCard = await db._find(Card, { user: req.user._id, type: 'PAYOUT' });

                if(existCard){
                    await db._delete(Card, {_id: existCard._id });
                }

                    const cardData = {
                            name: req.body.name,
                            user: req.user._id,
                            funding: accountToken.card.funding,
                            lastFour: accountToken.card.last4,
                            brand: accountToken.card.brand,
                            cardId: accountToken.card.id,
                            customerId: account.id,
                            type: 'PAYOUT'
                        }

                const user = await db._find(User, { _id: req.user._id });

                let existingCard = await db._find(Card, { customerId: user.stripeId });

                let data;

                if(existingCard) {
                    console.log("a")
                    await db._update(Card, { customerId: user.stripeId }, cardData);
                    const card = await db._find(Card, { cardId: accountToken.card.id });
                    data = { card };

                } else {
                    console.log("b")
                    const card = await db._store(Card, cardData);
                    data = { card };
                }
                
                user.stripeId = account.id;

                await db._update(User, { _id: req.user._id }, user);

                const response = helper.response({ data });
                console.log("eCard", response)
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

            let card = await db._find(Card, { _id: req.params.id });

            console.log("card", card);

            const customer = await stripe.customers.del(
              card.customerId
            );

            if(customer.deleted) await db._delete(Card, {_id: req.params.id });

            let card_default = await db._get(Card, {user: req.user._id, type: 'CHARGE'});

            if(card_default.length > 0){
                if(card.isDefault == true){
                    console.log(card_default[0], "q")
                    card_default[0].isDefault = 1;
                }
                console.log("card_default", card_default);
                await db._update(Card, { _id: card_default[0]._id }, card_default[0]);
                
            }
            const response = helper.response({ message: res.__('deleted'), data: card_default });
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

exports.defaultCard = async (req, res) => {
    try {
        let setting = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });
        let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');

        let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';

        if(secret_key) {
            let card = await db._find(Card, { _id: req.params.id });

            await db._updateMany(Card, {}, {$set: {isDefault: false}});

            card.isDefault = true;

            await db._update(Card, { _id: req.params.id }, card);
            
            let updated_card = await db._get(Card, {user: req.user._id, type: 'CHARGE'});

            const response = helper.response({ message: res.__('updated'), data: updated_card });
            return res.status(response.statusCode).json(response);
        }

    } catch (err) {
        console.log(err);
    }

}

exports.getWallet = async (req, res) => {
    try {

        let walletHistory = await db._get(PaymentLog, {user: req.user._id, service: "ADDMONEY"})
        const response = helper.response({ message: res.__('updated'), data: walletHistory });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }
}


exports.addMoney = async (req, res) => {
    try {
        console.log(req.body);
        let card = await db._find(Card, { _id: req.body.id });

        console.log(card);

        let setting = await db._find(Setting, {}, {createdAt: 0, updatedAt: 0 });
        let stripePayment = setting.payment.filter(pay => pay.name === 'STRIPE');
        
        if(stripePayment) {
            let currency = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'currency')[0].value : '';
            let secret_key = stripePayment.length > 0 && stripePayment[0].credentials ? stripePayment[0].credentials.filter(credential => credential.name === 'secret_key')[0].value : '';
            if(currency && secret_key) {
                let random = "FIV"+ Math.floor(Math.random() * (10000 - 1)) + 1;
                console.log("random", random);
                let paymentLog = {
                    transaction_code: random,
                    service: "ADDMONEY",
                    payment_mode: "STRIPE",
                    amount: req.body.amount,
                    user: req.user._id
                }
                const stripe = Stripe(secret_key);
                const charge = await stripe.charges.create({
                  amount: req.body.amount*100,
                  currency: currency,
                  customer: card.customerId
                });

                let response;
                let message;
                let status;
                const user = await db._find(User, { _id: req.user._id });
                if(charge.status == 'succeeded') {
                    
                    user.wallet += parseFloat(req.body.amount);

                    paymentLog.status = "Paid";

                    await db._update(User, { _id: req.user._id }, user);
                     message = res.__('wallet_added');
                     status = 200;

                } else {
                    paymentLog.status = "Failed";
                     message = res.__('payment_failed');
                     status = 500;
                }

                await db._store(PaymentLog, paymentLog);

                let walletHistory = await db._get(PaymentLog, {user: req.user._id, service: "ADDMONEY"})

                data = { wallet: user.wallet, amount: parseFloat(req.body.amount), paymentHistory: walletHistory };

                response = helper.response({ status: status, data: data, message: message });

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