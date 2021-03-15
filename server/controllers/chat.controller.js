const express = require("express");
const mongoose = require('mongoose');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
const { Message } = require('../models/Message');
const { Conversation } = require('../models/Conversation');
const { User } = require('../models/user');
const Joi = require('@hapi/joi');
const _ = require('lodash');

exports.getConversation = async (req, res) => {
    try {

        let from = mongoose.Types.ObjectId(req.user._id);

        let userList = await db._get(Conversation, { participants: { "$in" : [from]} }, {lastMessage: 1, date : 1}, {populate: {path: 'participants', select: 'firstName lastName profilePhoto'}});

        const data = { userList };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response); 

    } catch (err) {
        console.log(err);
    }

}



exports.getConversationList = async (req, res) => {
    try {

        let me = mongoose.Types.ObjectId(req.user._id);
        let other = mongoose.Types.ObjectId(req.params.id);

        let userList = await db._get(Message, {
                $or: [
                    { $and: [{ to: me }, { from: other }] },
                    { $and: [{ to: other }, { from: me }] },
                ],
            }, {message: 1, date : 1, type: 1, offer: 1}, {populate: [{path: 'from', select: 'firstName lastName profilePhoto'}, {path: 'to', select: 'firstName lastName profilePhoto'}, {path: 'offer.gig', select: "title"}] } );

        let user = await db._find(User, {_id: req.params.id}, {}, { populate: 
            [{ path: 'country', model: 'Country', select: 'name' },
            { path: 'city', model: 'city', select: 'name' },
            { path: 'state', model: 'state', select: 'name' }
            ]});

        const data = { userList, user };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response); 

    } catch (err) {
        console.log(err);
    }

}



exports.sendMessage = async (req, res) => {

    try {

        let from = mongoose.Types.ObjectId(req.user._id);
        let to = mongoose.Types.ObjectId(req.body.to);

        let message = (req.body.type == "text") ? req.body.message : "Sent You An Offer";

        let conversationData = {
                    participants: [req.user._id, req.body.to], 
                    lastMessage: message, 
                    date: Date.now()
                }


        let conversation =  await db._update(Conversation, {
                participants: {
                    $all: [
                        { $elemMatch: { $eq: from } },
                        { $elemMatch: { $eq: to } },
                    ],
                },
            }, conversationData);

        let messageData = {
                            conversation: conversation._id,
                            to: req.body.to,
                            from: req.user._id,
                            message: req.body.message ? req.body.message : "",
                            type: req.body.type
                        };

        if(req.body.type == "offer"){
                let data = {
                    gig: req.body.gig,
                    seller: req.user._id,
                    description: req.body.description,
                    duration: req.body.duration,
                    amount: req.body.amount,
                    status: "SENT",
                }
                messageData.offer = data;

        }



        let messages = await db._store(Message, messageData);

        let userList = await db._find(Conversation, { _id: messages.conversation }, {participants:1}, {populate: {path: 'participants', select: 'firstName lastName profilePhoto'}});

        let offer = await db._find(Message, {_id: messages._id}, {offer: 1}, {populate: [{path: 'offer.gig', select: "title"}] } );

        let fromData = userList.participants.find((p) => p.id == req.user._id) ;
        let toData = userList.participants.find((p) => p.id == req.body.to) ;

        let chatData = {
            _id: messages._id,
            date: messages.date,
            from: fromData,
            message: messages.message,
            to: toData,
            type: messages.type,
            offer: offer.offer
        }

        const data = { message: chatData };

        const response = helper.response({ data: data, message: "Sent Offer" });

        let room_name;

        if( req.user._id < to){
          room_name=req.user._id+'_'+to;
        }
        else{
          room_name=to+'_'+req.user._id;
        }


        req.io.sockets.in(room_name).emit('newMessage', chatData );

    //   console.log(req.io.sockets.in('a').emit('newMessage', messageData ));

       // req.io.sockets.in('a').emit('newMessage', messageData );

        //req.io.sockets.emit('messages', req.body.body);

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

