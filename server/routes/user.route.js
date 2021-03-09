const express = require('express');
const router = express.Router();
const path = require("path");

const middleware = require("../middlewares/common")

const authController = require('../controllers/auth.controller');
const homeController = require('../controllers/home.controller');
const profilecontroller = require('../controllers/profile.controller');
const gigController = require('../controllers/gigs.controller');
const orderController = require('../controllers/order.controller');
const requestController = require('../controllers/request.controller');
const cartController = require('../controllers/cart.controller');
const cardController = require('../controllers/card.controller');
const chatController = require('../controllers/chat.controller');


router.get('/pages/list/:type', (req, res) => {
  homeController.pagesList(req, res);
});

router.get('/pages/list', (req, res) => {
  homeController.pagesList(req, res);
});

router.get('/pages', (req, res) => {
  homeController.pages(req, res);
});

router.get('/page/:page', (req, res) => {
  homeController.page(req, res);
});

router.post('/login', (req, res) => {
  authController.login(req, res);
});

router.post('/register', (req, res) => {
  authController.register(req, res);
});

router.post('/change/password', middleware.user, (req, res) => {
  authController.changePassword(req, res);
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


router.get('/states/:id', (req, res) => {
  authController.state(req, res);
});

router.get('/cities/:id', (req, res) => {
  authController.city(req, res);
});

router.get('/language', (req, res) => {
  authController.language(req, res);
});

router.get('/skills', (req, res) => {
  authController.skill(req, res);
});

router.get('/user', middleware.user, (req, res) => {
  homeController.findUser(req, res);
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
  homeController.listcategory(req, res);
});

router.get('/subcategory/:id', (req, res) => {
  homeController.listbycategoryToSubCategory(req, res);
});

router.get('/delivery/time', (req, res) => {
  homeController.listDeliveryTime(req, res);
});

router.get('/coupon', middleware.user, (req, res) => {
  homeController.listCoupon(req, res);
});

router.post('/coupon', middleware.user, function(req, res){
  homeController.createCoupon(req, res);
});

router.get('/slide', (req, res) => {
  homeController.listSlide(req, res);
});

router.get('/menu', (req, res) => {
  homeController.listMenu(req, res);
});

router.get('/package', (req, res) => {
  homeController.listPackage(req, res);
});

router.get('/cancel/reason/:type', (req, res) => {
  homeController.listCancelReason(req, res);
});

router.post('/refresh', (req, res) => {
  authController.refresh(req, res);
});

/*Gig*/

router.get('/favourites', middleware.user, (req, res) => {
  homeController.getFavourites(req, res);
});

router.post('/favourite/:id', middleware.user, (req, res) => {
  homeController.addFavourite(req, res);
});

router.get('/favourite/cart', middleware.user, (req, res) => {
  homeController.addFavouritetoCart(req, res);
});

router.get('/revenues', middleware.user, (req, res) => {
  homeController.revenues(req, res);
});

router.get('/withdrawal', middleware.user, (req, res) => {
  homeController.withdrawlList(req, res);
});

router.post('/withdrawal', middleware.user, (req, res) => {
  homeController.withdrawl(req, res);
});

router.get('/recent', middleware.user, (req, res) => {
  homeController.getRecent(req, res);
});

router.get('/profile', middleware.user, (req, res) => {
  profilecontroller.getProfile(req, res);
});

router.get('/list/gigs', (req, res) => {
  gigController.listgigs(req, res);
});
router.get('/gig/details/:id', middleware.user, (req, res) => {
  gigController.getGigDetails(req, res);
});
router.get('/gig/detail/:title', (req, res) => {
  gigController.getGigDetailByName(req, res);
});
router.get('/gig/package/:id', (req, res) => {
  gigController.getPackage(req, res);
});
router.get('/gigs', middleware.user, (req, res) => {
  gigController.usergigs(req, res);
});
router.post('/gig', middleware.user, function(req, res){
  gigController.creategigs(req, res);
});
router.post('/gig/pricing',middleware.user, function(req, res){
  gigController.updatePricing(req, res);
});
router.post('/gig/faq', function(req, res){
  gigController.faq(req, res);
});
router.patch('/gig/faq', middleware.user, function(req, res){
  gigController.updateFaq(req, res);
});
router.delete('/gig/faq', function(req, res){
  gigController.deleteFaq(req, res);
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
router.delete('/gig/delete/:id', middleware.user, function(req, res){
  gigController.deleteGig(req, res);
});
router.get('/gig/submit/approval/:id', middleware.user, function(req, res){
  gigController.submitApproval(req, res);
});
router.post('/change/gigstatus', middleware.user, (req, res) => {
  gigController.gigStatus(req, res);
});

/*Cart*/
router.get('/cart', middleware.user, function(req, res){
  cartController.listcart(req, res);
});
router.get('/cart/count', middleware.user, function(req, res){
  cartController.cartCount(req, res);
});
router.post('/cart', middleware.user, function(req, res){
  cartController.addcart(req, res);
});
router.patch('/cart', middleware.user, function(req, res){
  cartController.updateCart(req, res);
});
router.delete('/cart/:id', middleware.user, function(req, res){
  cartController.removecart(req, res);
});
router.get('/cart/:id', middleware.user, function(req, res){
  cartController.findcart(req, res);
});

/*Order*/
router.post('/checkout', middleware.user, function(req, res){
  orderController.checkout(req, res);
});
router.post('/update/order/status',[middleware.user, middleware.upload( path.join(__dirname, '../storage/images/order/') ).fields([{ name: 'delivery_file', maxCount: 1 }, { name: 'revision_file', maxCount: 1 }]) ], function(req, res){
  orderController.updateOrder(req, res);
});

router.post('/tips', middleware.user, function(req, res){
  orderController.tips(req, res);
});

router.post('/rate', middleware.user, function(req, res){
  orderController.rating(req, res);
});

router.post('/cancel', middleware.user, function(req, res){
  orderController.cancel(req, res);
});

/*Proposal Request*/
router.post('/request', [middleware.user, middleware.upload( path.join(__dirname, '../storage/images/request/') ).fields([{ name: 'files', maxCount: 1 }]) ], (req, res) => {
  requestController.createrequest(req, res);
});
router.get('/requests',middleware.user, (req, res) => {
  requestController.listRequests(req, res);
});
router.post('/offer', middleware.user, function(req, res){
  requestController.request_offer(req, res);
});
router.delete('/request/:id', middleware.user, (req, res) => {
  requestController.deleteRequest(req, res);
});
router.get('/request/changestatus/:id/:status', middleware.user, (req, res) => {
  requestController.changeStatus(req, res);
});
router.get('/buyer/requests',middleware.user, (req, res) => {
  requestController.buyerRequest(req, res);
});
router.get('/sent/offers',middleware.user, (req, res) => {
  requestController.sentOffer(req, res);
});
router.get('/view/offer/:id',middleware.user, (req, res) => {
  requestController.viewOffer(req, res);
});
router.post('/order/offer', middleware.user, function(req, res){
  requestController.orderOffer(req, res);
});

router.post('/send_sms', (req, res) => {
  homeController.sendSms(req, res);
});

router.post('/send_mail', (req, res) => {
  homeController.sendMail(req, res);
});

router.get('/buyer/orderlist', middleware.user, function(req, res){
  homeController.buyerOrderList(req, res);
});

router.get('/seller/orderlist', middleware.user, function(req, res){
  homeController.sellerOrderList(req, res);
});

router.get('/get/orderdetails/:id', middleware.user, (req, res) => {
  homeController.getOrderDetails(req, res);
});

router.get('/rating/:id', middleware.user, (req, res) => {
  homeController.orderRating(req, res);
});

router.get('/gig/subcategory',middleware.user, (req, res) => {
  homeController.gigSubCatoegory(req, res);
});

router.get('/request/gigs/:id/:sub', middleware.user, (req, res) => {
  homeController.requestGigs(req, res);
});

router.get('/cards', middleware.user, (req, res) => {
  cardController.getCard(req, res);
});

router.get('/cards/payout', middleware.user, (req, res) => {
  cardController.getPayoutCard(req, res);
});



router.get('/seller/buyer', middleware.user, (req, res) => {
  homeController.sellerBuyer(req, res);
});

router.get('/notifications',middleware.user, (req, res) => {
  homeController.notifications(req, res);
});

router.delete('/notifications/:id', middleware.user, (req, res) => {
  homeController.deleteNotification(req, res);
});

router.get('/buyit/again', middleware.user, (req, res) => {
  homeController.buyItAgain(req, res);
});

router.get('/profile/gigs/:id', (req, res) => {
  homeController.profileGigs(req, res);
});

router.post('/card/add', middleware.user, (req, res) => {
  cardController.addCard(req, res);
});

router.post('/card/payout/add', middleware.user, (req, res) => {
  cardController.addPayoutCard(req, res);
});

router.post('/wallet', middleware.user, (req, res) => {
  cardController.addMoney(req, res);
});

router.get('/wallet', middleware.user, (req, res) => {
  cardController.getWallet(req, res);
});

router.delete('/card/remove/:id', middleware.user, (req, res) => {
  cardController.removeCard(req, res);
});

router.delete('/card/payout/remove', middleware.user, (req, res) => {
  cardController.removePayoutCard(req, res);
});

router.get('/default/card/:id', middleware.user, (req, res) => {
  cardController.defaultCard(req, res);
});

router.get('/chat/users', middleware.user, (req, res) => {
  chatController.getConversation(req, res);
});

router.get('/chat/:id', middleware.user, (req, res) => {
  chatController.getConversationList(req, res);
});

router.post('/chat', [middleware.user, middleware.upload( path.join(__dirname, '../storage/images/gig/') ).fields([{ name: 'photo[]', maxCount: 4 }]) ], (req, res) => {
  chatController.sendMessage(req, res);
});

/*router.post('/chat', middleware.user, (req, res) => {
  chatController.sendMessage(req, res);
});*/

/*router.post('/reset-password', authController.forgetpassword)

router.post('/passwordreset',authController.passwordreset)

router.use('/verification', authController.verification);*/


module.exports = router;