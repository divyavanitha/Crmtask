var express = require('express');
const router = express.Router();
const adminauth = require("../../middlewares/adminauth")
const dotenv = require('dotenv');
dotenv.config();
const categorycontroller = require('../../controllers/admin/category.controller');

 
router.post('/createcategory', adminauth,async (req, res) => {
    await categorycontroller.createcategory(req.body, "admin", res);
  });
router.post('/deletecategory',adminauth,async (req, res) => {
    await categorycontroller.deletecategory(req.body, "admin", res);
  });
router.post('/listcategory', adminauth,async (req, res) => {
    await categorycontroller.listcategory(req.body, "admin", res);
  });

module.exports = router;