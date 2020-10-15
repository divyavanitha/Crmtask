const express = require('express');
const router = express.Router();

const auth = require("../middlewares/auth")
const profilecontroller = require('../controllers/profile');

const { User } = require('../models/user');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
// router.get('/test', auth, profilecontroller.usesfromtoken);

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/profile', auth, profilecontroller.getProfile);

/* // @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/create',
  auth,
  profilecontroller.createprofile
);



// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', auth, profilecontroller.getallprofile);



// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', profilecontroller.user);


// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  auth,
  profilecontroller.experience);



// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  '/education',
  auth,
  profilecontroller.education
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  auth,
  profilecontroller.deleteexperience
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  auth,
  profilecontroller.deleteeducation
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/deleteprofile',
  auth,
  profilecontroller.deleteprofile
);
 */
module.exports = router;
