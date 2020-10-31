const express = require('express');
const router = express.Router();
const path = require("path");

const middleware = require("../middlewares/common")

const authController = require('../controllers/auth.controller');
const homeController = require('../controllers/home.controller');
const profilecontroller = require('../controllers/profile.controller');
const pageController = require('../controllers/admin/page.controller');
const packageController = require('../controllers/admin/package.controller');
const menuController = require('../controllers/admin/menu.controller');
const gigController = require('../controllers/gigs.controller');
const orderController = require('../controllers/order.controller');


router.post('/login', (req, res) => {
  authController.login(req, res);
});

router.post('/register', (req, res) => {
  authController.register(req, res);
});

router.post('/social', (req, res) => {
  authController.social(req, res);
});

router.get('/countries', (req, res) => {
  authController.country(req, res);
});

router.get('/settings', (req, res) => {
  homeController.settings(req, res);
});


router.get('/states', (req, res) => {
  authController.state(req, res);
});

router.get('/cities', (req, res) => {
  authController.city(req, res);
});

router.get('/language', (req, res) => {
  authController.language(req, res);
});

router.get('/skills', (req, res) => {
  authController.skill(req, res);
});

router.get('/profile', middleware.user, (req, res) => {
  profilecontroller.getProfile(req, res);
});

router.post('/profile', [middleware.user, middleware.upload( path.join(__dirname, '../storage/images/user/') ).fields([{ name: 'profile_photo', maxCount: 4 }, { name: 'cover_photo', maxCount: 1 }]) ],  (req, res) => {
  profilecontroller.updateProfile(req, res);
});

router.post('/profile/language', middleware.user, (req, res) => {
  profilecontroller.updateLanguage(req, res);
});

router.post('/profile/skill', middleware.user, (req, res) => {
  profilecontroller.updateSkill(req, res);
});

router.post('/profile/education', middleware.user, (req, res) => {
  profilecontroller.updateEducation(req, res);
});

router.post('/profile/certification', middleware.user, (req, res) => {
  profilecontroller.updateCertification(req, res);
});

router.get('/category', (req, res) => {
  profilecontroller.listcategory(req, res);
});

router.get('/subcategory/:id', (req, res) => {
  profilecontroller.listbycategoryToSubCategory(req, res);
});

router.get('/delivery/time', (req, res) => {
  profilecontroller.listDeliveryTime(req, res);
});

router.get('/coupon', (req, res) => {
  profilecontroller.listCoupon(req, res);
});

router.post('/coupon', function(req, res){
  profilecontroller.createCoupon(req, res);
});

router.get('/slide', (req, res) => {
  profilecontroller.listSlide(req, res);
});




router.get('/page', (req, res) => {
  pageController.listpage(req, res);
});
router.post('/page', function(req, res){
  pageController.createpage(req, res);
});
router.patch('/page', function(req, res){
  pageController.updatePage(req, res);
});
router.delete('/page/:id', function(req, res){
  pageController.deletepage(req, res);
});





router.get('/package', (req, res) => {
  packageController.listPackage(req, res);
});
router.post('/package', function(req, res){
  packageController.createPackage(req, res);
});
router.patch('/package', function(req, res){
  packageController.updatePackage(req, res);
});
router.delete('/package/:id', function(req, res){
  packageController.deletePackage(req, res);
});


router.get('/menu', (req, res) => {
  menuController.listMenu(req, res);
});
router.post('/menu', [middleware.upload( path.join(__dirname, '../storage/images/menu/') ).fields([{ name: 'layoutPhoto', maxCount: 1 }]) ], function(req, res){
  menuController.createMenu(req, res);
});
router.patch('/menu', [middleware.upload( path.join(__dirname, '../storage/images/menu/') ).fields([{ name: 'layoutPhoto', maxCount: 1 }]) ], function(req, res){
  menuController.updateMenu(req, res);
});
router.delete('/menu/:id', function(req, res){
  menuController.deleteMenu(req, res);
});

/*Gig*/
router.get('/list/gigs', (req, res) => {
  gigController.withoutAuthgigs(req, res);
});
router.get('/get/gig/details/:id', (req, res) => {
  gigController.getGigDetails(req, res);
});
router.get('/gigs', middleware.user, (req, res) => {
  gigController.listgigs(req, res);
});
router.post('/gig', middleware.user, function(req, res){
  gigController.creategigs(req, res);
});
router.post('/gig/pricing',middleware.user, function(req, res){
  gigController.updatePricing(req, res);
});
router.post('/gig/faq', middleware.user, function(req, res){
  gigController.updateFaq(req, res);
});
router.post('/gig/requirement', middleware.user, function(req, res){
  gigController.updateRequirement(req, res);
});
router.post('/gig/upload', [middleware.user, middleware.upload( path.join(__dirname, '../storage/images/gig/') ).fields([{ name: 'photo[]', maxCount: 4 }]) ], (req, res) => {
  gigController.updateImage(req, res);
});
router.post('/gig/confirm', middleware.user, function(req, res){
  gigController.updateConfirm(req, res);
});
/*Cart*/
router.get('/gig/cart', middleware.user, function(req, res){
  orderController.listcart(req, res);
});
router.post('/gig/cart', middleware.user, function(req, res){
  orderController.addcart(req, res);
});
router.delete('/gig/cart/:id', middleware.user, function(req, res){
  orderController.removecart(req, res);
});

/*Order*/
router.post('/gig/checkout', middleware.user, function(req, res){
  orderController.checkout(req, res);
});
router.post('/gig/rate', middleware.user, function(req, res){
  orderController.rating(req, res);
});





router.post('/send_sms', (req, res) => {
  homeController.sendSms(req, res);
});

router.post('/send_mail', (req, res) => {
  homeController.sendMail(req, res);
});

/* //const auth = require("../middlewares/auth");
const passport = require('passport');
// require('../config/passport')(passport)

router.post('/login', (req, res) => {
  authController.login(req, res);
});

router.post('/register', authController.register)

router.post('/reset-password', authController.forgetpassword)

router.post('/passwordreset',authController.passwordreset)

router.use('/verification', authController.verification)

// router.post('/login', authController.login);

// router.post('/register', authController.register);

router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

router.get('/google', passport.authenticate('google', { scope: ["profile"] }), authController.googleOAuth);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  function (req, res) {
    res.redirect('/');
  });

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })); */

module.exports = router;