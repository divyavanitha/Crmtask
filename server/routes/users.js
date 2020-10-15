var express = require('express');
const auth = require("../middlewares/auth");

var router = express.Router();

const userController = require('../controllers/user');

router.get('/', auth, userController.index);
router.get('/user/:user_id', auth, userController.user);
router.get('/user', auth, userController.usesfromtoken);
module.exports = router;    