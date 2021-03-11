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
            }, {message: 1, date : 1}, {populate: [{path: 'from', select: 'firstName lastName profilePhoto'}, {path: 'to', select: 'firstName lastName profilePhoto'}] } );

        let user = await db._find(User, {_id: req.params.id});

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

        let conversationData = {
                    participants: [req.user._id, req.body.to], 
                    lastMessage: req.body.message, 
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
                        message: req.body.message
                        };

        let message = await db._store(Message, messageData);

        const data = { message };

        const response = helper.response({ data });

        let room_name;

        if( req.user._id < to){
          room_name=req.user._id+'_'+to;
        }
        else{
          room_name=to+'_'+req.user._id;
        }

        console.log(room_name);

        req.io.sockets.in(room_name).emit('newMessage', messageData );

    //   console.log(req.io.sockets.in('a').emit('newMessage', messageData ));

       // req.io.sockets.in('a').emit('newMessage', messageData );

        //req.io.sockets.emit('messages', req.body.body);

        return res.status(response.statusCode).json(response); 

    } catch (err) {
        console.log(err);
    }

}

