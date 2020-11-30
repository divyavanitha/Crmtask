const express = require('express');
const router = express.Router();
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
const homeController = require('../controllers/home.controller');
const userController = require('../controllers/admin/user.controller');
const proposalController = require('../controllers/proposal.controller');

router.post('/login', (req, res) => {
    adminController.adminAuth(req, res);
});

router.post('/register', (req, res) => {
    adminController.adminAuthRegister(req, res);
});

router.post('/permissions', (req, res) => {
  adminController.getPermissions(req, res);
});

router.get('/administrator', (req, res) => {
  adminController.getAdministrators(req, res);
});

router.post('/administrator', (req, res) => {
  adminController.addAdministrator(req, res);
});


router.get('/category', (req, res) => {
  categoryController.listcategory(req, res);
});
router.post('/category', (req, res) => {
  categoryController.createcategory(req, res);
});
router.patch('/category', (req, res) => {
  categoryController.updateCategory(req, res);
});
router.delete('/category/:id', (req, res) => {
  categoryController.deletecategory(req, res);
});
router.get('/get/category/:id', (req, res) => {
  categoryController.listcategorybyid(req, res);
});
router.get('/category/changestatus/:id/:status', (req, res) => {
  categoryController.changeStatus(req, res);
});


router.get('/subcategory', (req, res) => {
  subcategoryController.listSubCategory(req, res);
});
router.post('/subcategory', (req, res) => {
  subcategoryController.createSubCategory(req, res);
});
router.patch('/subcategory', (req, res) => {
  subcategoryController.updateSubCategory(req, res);
});
router.delete('/subcategory/:id', (req, res) => {
  subcategoryController.deleteSubCategory(req, res);
});
router.get('/get/subcategory/:id', (req, res) => {
  subcategoryController.listSubCategorybyid(req, res);
});
router.get('/subcategory/changestatus/:id/:status', (req, res) => {
  subcategoryController.changeStatus(req, res);
});


router.get('/skill', (req, res) => {
  skillController.listSkill(req, res);
});
router.post('/skill', (req, res) => {
  skillController.createSkill(req, res);
});
router.patch('/skill', (req, res) => {
  skillController.updateSkill(req, res);
});
router.delete('/skill/:id', (req, res) => {
  skillController.deleteSkill(req, res);
});
router.get('/get/skill/:id', (req, res) => {
  skillController.listSkillbyid(req, res);
});


router.get('/delivery/time', (req, res) => {
  deliveryTimeController.listDeliveryTime(req, res);
});
router.post('/delivery/time', (req, res) => {
  deliveryTimeController.createDeliveryTime(req, res);
});
router.patch('/delivery/time', (req, res) => {
  deliveryTimeController.updateDeliveryTime(req, res);
});
router.delete('/delivery/time/:id', (req, res) => {
  deliveryTimeController.deleteDeliveryTime(req, res);
});
router.get('/get/delivery/time/:id', (req, res) => {
  deliveryTimeController.listDeliveryTimebyid(req, res);
});


router.get('/language', (req, res) => {
  languageController.listLanguage(req, res);
});
router.post('/language', (req, res) => {
  languageController.createLanguage(req, res);
});
router.patch('/language', (req, res) => {
  languageController.updateLanguage(req, res);
});
router.delete('/language/:id', (req, res) => {
  languageController.deleteLanguage(req, res);
});
router.get('/get/language/:id', (req, res) => {
  languageController.listLanguagebyid(req, res);
});


router.get('/coupon', (req, res) => {
  couponController.listCoupon(req, res);
});
router.post('/coupon', (req, res) => {
  couponController.createCoupon(req, res);
});
router.patch('/coupon', (req, res) => {
  couponController.updateCoupon(req, res);
});
router.delete('/coupon/:id', (req, res) => {
  couponController.deleteCoupon(req, res);
});
router.get('/get/coupon/:id', (req, res) => {
  couponController.listCouponbyid(req, res);
});

router.get('/slide', (req, res) => {
  slideController.listSlide(req, res);
});
router.post('/slide', [middleware.upload( path.join(__dirname, '../storage/images/slide/') ).fields([{ name: 'layoutPhoto', maxCount: 1 }]) ], (req, res) => {
  console.log(req.files);
  slideController.createSlide(req, res);
});
router.patch('/slide', [middleware.upload( path.join(__dirname, '../storage/images/slide/') ).fields([{ name: 'layoutPhoto', maxCount: 1 }]) ], (req, res) => {
  console.log(req.files);
  slideController.updateSlide(req, res);
});
router.delete('/slide/:id', (req, res) => {
  slideController.deleteSlide(req, res);
});
router.get('/get/slide/:id', (req, res) => {
  slideController.listSlidebyid(req, res);
});
router.get('/slide/changestatus/:id/:status', (req, res) => {
  slideController.changeStatus(req, res);
});

router.get('/menu', (req, res) => {
  menuController.listMenu(req, res);
});
router.post('/menu', [middleware.upload( path.join(__dirname, '../storage/images/menu/') ).fields([{ name: 'layoutPhoto', maxCount: 1 }]) ], (req, res) => {
  menuController.createMenu(req, res);
});
router.patch('/menu', [middleware.upload( path.join(__dirname, '../storage/images/menu/') ).fields([{ name: 'layoutPhoto', maxCount: 1 }]) ], (req, res) => {
  menuController.updateMenu(req, res);
});
router.delete('/menu/:id', (req, res) => {
  menuController.deleteMenu(req, res);
});
router.get('/get/menu/:id', (req, res) => {
  menuController.listMenubyid(req, res);
});
router.get('/menu/changestatus/:id/:status', (req, res) => {
  menuController.changeStatus(req, res);
});

router.get('/package', (req, res) => {
  packageController.listPackage(req, res);
});
router.post('/package', (req, res) => {
  packageController.createPackage(req, res);
});
router.patch('/package', (req, res) => {
  packageController.updatePackage(req, res);
});
router.delete('/package/:id', (req, res) => {
  packageController.deletePackage(req, res);
});
router.get('/get/package/:id', (req, res) => {
  packageController.listPackagebyid(req, res);
});
router.get('/package/changestatus/:id/:status', (req, res) => {
  packageController.changeStatus(req, res);
});

router.get('/page', (req, res) => {
  pageController.listpage(req, res);
});
router.post('/page', (req, res) => {
  pageController.createpage(req, res);
});
router.patch('/page', (req, res) => {
  pageController.updatePage(req, res);
});
router.delete('/page/:id', (req, res) => {
  pageController.deletepage(req, res);
});
router.get('/get/page/:id', (req, res) => {
  pageController.listPagebyid(req, res);
});
router.get('/page/changestatus/:id/:status', (req, res) => {
  pageController.changeStatus(req, res);
});

router.get('/user/:id/id', (req, res) => {
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

router.get('/requests', (req, res) => {
  proposalController.listRequests(req, res);
});
router.delete('/request/:id', (req, res) => {
  proposalController.deleteRequest(req, res);
});
router.get('/request/changestatus/:id/:status', (req, res) => {
  proposalController.changeStatus(req, res);
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

router.post('/settings/push',  (req, res) => {
  settingController.updatePush(req, res);
});

router.post('/settings/social',  (req, res) => {
  settingController.updateSocial(req, res);
});

router.post('/settings/sms',  (req, res) => {
  settingController.updateSms(req, res);
});

router.post('/settings/mail',  (req, res) => {
  settingController.updateMail(req, res);
});

router.post('/settings/payment',  (req, res) => {
  settingController.updatePayment(req, res);
});

router.post('/settings/application',  (req, res) => {
  settingController.updateApplication(req, res);
});

router.post('/settings/seller',  (req, res) => {
  settingController.updateSeller(req, res);
});

router.post('/settings/gig',  (req, res) => {
  settingController.updateGig(req, res);
});

router.post('/settings/pricing',  (req, res) => {
  settingController.updatePricing(req, res);
});


module.exports = router;