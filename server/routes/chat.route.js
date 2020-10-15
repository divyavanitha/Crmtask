// require library modules
const express = require("express");
const router = express.Router();

// require authentication helper module
const passport = require("passport");
const auth = require("./../middlewares/auth")
// require controllers
const { test, insertChat, getAllChats } = require("../controllers/chat.controller.js");
const {  getchat } = require("../controllers/chat.js");
//new

router.get(
  "/getchat",
 auth,
 getchat
);




//@desc     test
//@route    GET /api/chat/test
//@access   Public
router.get("/test", test);

//@desc     insert a chat
//@route    POST /api/chat/insertchat
//@access   Private
router.post(
  "/insertchat",
 auth,
  insertChat
);

//@desc     view all chats
//@route    GET /api/chat/getallchats
//@access   Private
router.get(
  "/getallchats",
 auth,
  getAllChats
);

module.exports = router;