var express = require('express');
var router = express.Router();
const path = require("path");

const middleware = require("../middlewares/common");

const adminController = require('../controllers/admin/admin.controller');
const settingController = require('../controllers/admin/settings.controller');
const pageController = require('../controllers/admin/page.controller');
const couponController = require('../controllers/admin/coupon.controller');
const deliveryTimeController = require('../controllers/admin/deliveryTime.controller');
const categoryController = require('../controllers/admin/category.controller');
const subcategoryController = require('../controllers/admin/subCategory.controller');
const packageController = require('../controllers/admin/package.controller');
const menuController = require('../controllers/admin/menu.controller');
const skillController = require('../controllers/admin/skill.controller');
const languageController = require('../controllers/admin/language.controller');
const slideController = require('../controllers/admin/slide.controller');

router.post('/login',  async (req, res) => {
    await adminController.adminAuth(req, res);
});

router.post('/register', async (req, res) => {
    await adminController.adminAuthRegister(req.body, "admin", res);
});

router.get('/user', [middleware.admin], (req, res) => {
  adminController.getAllUser(req, res);
});

router.post('/user', [middleware.admin], (req, res) => {
  adminController.addUser(req, res);
});

router.get('/category', (req, res) => {
  categoryController.listcategory(req, res);
});
router.post('/category', function(req, res){
  categoryController.createcategory(req, res);
});
router.patch('/category', function(req, res){
  categoryController.updateCategory(req, res);
});
router.delete('/category/:id', function(req, res){
  categoryController.deletecategory(req, res);
});
router.get('/get/category/:id', function(req, res){
  categoryController.listcategorybyid(req, res);
});
router.get('/category/changestatus/:id/:status', function(req, res){
  categoryController.changeStatus(req, res);
});


router.get('/subcategory', (req, res) => {
  subcategoryController.listSubCategory(req, res);
});
router.post('/subcategory', function(req, res){
  subcategoryController.createSubCategory(req, res);
});
router.patch('/subcategory', function(req, res){
  subcategoryController.updateSubCategory(req, res);
});
router.delete('/subcategory/:id', function(req, res){
  subcategoryController.deleteSubCategory(req, res);
});
router.get('/get/subcategory/:id', function(req, res){
  subcategoryController.listSubCategorybyid(req, res);
});
router.get('/subcategory/changestatus/:id/:status', function(req, res){
  subcategoryController.changeStatus(req, res);
});


router.get('/skill', (req, res) => {
  skillController.listSkill(req, res);
});
router.post('/skill', function(req, res){
  skillController.createSkill(req, res);
});
router.patch('/skill', function(req, res){
  skillController.updateSkill(req, res);
});
router.delete('/skill/:id', function(req, res){
  skillController.deleteSkill(req, res);
});
router.get('/get/skill/:id', function(req, res){
  skillController.listSkillbyid(req, res);
});


router.get('/delivery/time', (req, res) => {
  deliveryTimeController.listDeliveryTime(req, res);
});
router.post('/delivery/time', function(req, res){
  deliveryTimeController.createDeliveryTime(req, res);
});
router.patch('/delivery/time', function(req, res){
  deliveryTimeController.updateDeliveryTime(req, res);
});
router.delete('/delivery/time/:id', function(req, res){
  deliveryTimeController.deleteDeliveryTime(req, res);
});
router.get('/get/delivery/time/:id', function(req, res){
  deliveryTimeController.listDeliveryTimebyid(req, res);
});


router.get('/language', (req, res) => {
  languageController.listLanguage(req, res);
});
router.post('/language', function(req, res){
  languageController.createLanguage(req, res);
});
router.patch('/language', function(req, res){
  languageController.updateLanguage(req, res);
});
router.delete('/language/:id', function(req, res){
  languageController.deleteLanguage(req, res);
});
router.get('/get/language/:id', function(req, res){
  languageController.listLanguagebyid(req, res);
});


router.get('/coupon', (req, res) => {
  couponController.listCoupon(req, res);
});
router.post('/coupon', function(req, res){
  couponController.createCoupon(req, res);
});
router.patch('/coupon', function(req, res){
  couponController.updateCoupon(req, res);
});
router.delete('/coupon/:id', function(req, res){
  couponController.deleteCoupon(req, res);
});
router.get('/get/coupon/:id', function(req, res){
  couponController.listCouponbyid(req, res);
});

router.get('/slide', (req, res) => {
  slideController.listSlide(req, res);
});
router.post('/slide', [middleware.upload( path.join(__dirname, '../storage/images/slide/') ).fields([{ name: 'layoutPhoto', maxCount: 1 }]) ], function(req, res){
  slideController.createSlide(req, res);
});
router.patch('/slide', [middleware.upload( path.join(__dirname, '../storage/images/slide/') ).fields([{ name: 'layoutPhoto', maxCount: 1 }]) ], function(req, res){
  slideController.updateSlide(req, res);
});
router.delete('/slide/:id', function(req, res){
  slideController.deleteSlide(req, res);
});
router.get('/get/slide/:id', function(req, res){
  slideController.listSlidebyid(req, res);
});
router.get('/slide/changestatus/:id/:status', function(req, res){
  slideController.changeStatus(req, res);
});

router.get('/settings', (req, res) => {
  settingController.getSetting(req, res);
});

router.post('/settings/general', [middleware.admin, middleware.uploadAs( path.join(__dirname, '../storage/images/common/') ).fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]) ],  (req, res) => {
  settingController.updateGeneral(req, res);
});


module.exports = router;