const express = require('express');
const router = express.Router();
const path = require("path");

const middleware = require("../middlewares/common");

const adminController = require('../controllers/admin/admin.controller');
const settingController = require('../controllers/admin/settings.controller');
const userController = require('../controllers/admin/user.controller');
const commentController = require('../controllers/admin/comment.controller');
const postController = require('../controllers/admin/post.controller');

router.post('/login', (req, res) => {
  adminController.adminAuth(req, res);
});

router.post('/register', (req, res) => {
  adminController.adminAuthRegister(req, res);
});


router.get('/post', (req, res) => {
  postController.listPost(req, res);
});
router.post('/post', [middleware.upload( path.join(__dirname, '../storage/images/post/') ).fields([{ name: 'layoutPhoto', maxCount: 1 }]) ], (req, res) => {
  console.log(req.files);
  postController.createPost(req, res);
});
router.patch('/post', [middleware.upload( path.join(__dirname, '../storage/images/post/') ).fields([{ name: 'layoutPhoto', maxCount: 1 }]) ], (req, res) => {
  console.log(req.files);
  postController.updatePost(req, res);
});
router.delete('/post/:id', (req, res) => {
  postController.deletePost(req, res);
});
router.get('/get/post/:id', (req, res) => {
  postController.listPostbyid(req, res);
});
router.get('/post/changestatus/:id/:status', (req, res) => {
  postController.changeStatus(req, res);
});



router.get('/user', (req, res) => {
  userController.listusers(req, res);
});
router.post('/user', (req, res) => {
  userController.createuser(req, res);
});
router.patch('/user', (req, res) => {
  userController.updateuser(req, res);
});
router.delete('/user/:id', (req, res) => {
  userController.deleteuser(req, res);
});
router.get('/get/user/:id', (req, res) => {
  userController.listuserbyid(req, res);
});
router.get('/user/changestatus/:id/:status', (req, res) => {
  userController.changeStatus(req, res);
});

router.get('/comment', (req, res) => {
  commentController.listComments(req, res);
});

router.get('/comment/changestatus/:id/:status', (req, res) => {
  commentController.changeStatus(req, res);
});

router.get('/settings', (req, res) => {
  settingController.getSetting(req, res);
});

router.post('/settings/general', [middleware.admin, middleware.uploadAs( path.join(__dirname, '../storage/images/common/') ).fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]) ],  (req, res) => {
  settingController.updateGeneral(req, res);
});

router.post('/settings/social_links',  (req, res) => {
  settingController.updateSocialLink(req, res);
});



module.exports = router;