
// const chatuser=require('./chat/user');
// const deletecontroller=require('./chat/delete');
// const chatRoomcontroller=require('./chat/chatRoom');


// require library modules
const mongoose = require("mongoose"); // database driver

// load database collection
const {Chat,validate} = require("../models/chat");

// load validation depending upon inputs
//const validateChatDetailsInput = require("../validations/chat");

// TODO: test the chat route
exports.test = async (req, res, next) => {
  res.json({
    success: true
  });
};

// TODO: insert new chat
exports.insertChat = async (req, res, next) => {
//   const { errors, isValid } = true;
//   if (!isValid) {
//     // if chat data is not valid
//     res.status(400).json(errors);
//   } else {
   
    try {
        const { error } = validate(req.body);
        const errors = {};
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = (err.message).replace(/"/g, "");
            }
        }
        if (error) return res.status(422).json(errors);
        console.log("res.user",req.user)
      const newChat = new Chat({
        user:req.user._id,
        name: req.user.name,
        content: req.body.content
      });
      console.log("newChat",newChat);
      const chat = await newChat.save();
      res.json(chat);
    } catch (err) {
      console.log(err);
    }
//   }
};

// TODO: view all chats
exports.getAllChats = async (req, res, next) => {
  try {
    const chat = await Chat.find();
    res.json(chat);
  } catch (err) {
    console.log(err);
  }
};