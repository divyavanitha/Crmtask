const express=require("express");
const app = express();


// Load Profile Model

// Load User Model
const { User } = require('./../../models/user');
const {Chat} = require ('./../../models/chat.js');


  
   exports.onGetUserById= async (req, res) => {
      const errors = {};

      Chat.findOne({ user: req.user._id })
        .populate('user', ['name'])
        .then(chat => {
            if (!chat) {
                errors = 'There is no chat for this user';
                return res.status(404).json(errors);
            }
            res.json(chat);
        })
        .catch(err => res.status(404).json(err));
     }
   
  