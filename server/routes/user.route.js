const express = require('express');
const router = express.Router();
const path = require("path");

const middleware = require("../middlewares/common")

const authController = require('../controllers/auth.controller');
const profilecontroller = require('../controllers/profile.controller');
const commentController = require('../controllers/comment.controller');

router.post('/login', (req, res) => {
  authController.login(req, res);
});

router.post('/register', (req, res) => {
  authController.register(req, res);
});

router.post('/change/password', middleware.user, (req, res) => {
  authController.changePassword(req, res);
});


router.get('/profile', middleware.user, (req, res) => {
  profilecontroller.getProfile(req, res);
});

router.post('/profile', [middleware.user, middleware.upload( path.join(__dirname, '../storage/images/user/') ).fields([{ name: 'profile_photo', maxCount: 4 }, { name: 'cover_photo', maxCount: 1 }]) ],  (req, res) => {
  profilecontroller.updateProfile(req, res);
});


router.post('/refresh', (req, res) => {
  authController.refresh(req, res);
});

router.get('/profile', middleware.user, (req, res) => {
  profilecontroller.getProfile(req, res);
});

router.post('/comment',middleware.user, (req, res) => {
  commentController.createComment(req, res);
});

router.get('/comment', (req, res) => {
  commentController.getComment(req, res);
});

router.get('/post', (req, res) => {
  profilecontroller.getPost(req, res);
});

router.get('/get/post/:id', (req, res) => {
  profilecontroller.listPostbyid(req, res);
});


module.exports = router;