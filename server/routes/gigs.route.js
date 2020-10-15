const express = require('express');
const router = express.Router();



const auth = require("./../middlewares/auth")
const gigcontroller = require('./../controllers/gigs.controller');

router.post('/', async(req,res) => {
  
});

// router.get('/', auth, gigcontroller.listgigs);

router.post('/create', auth,gigcontroller.creategigs);
router.delete('/deletegigs/:gigid', auth,gigcontroller.deletegigs);
router.post('/getallgigs', auth,gigcontroller.getallgigs);
router.get('/findgigbyid/:gigid', auth,gigcontroller.findgigbyid);
router.post('/extragig',auth,gigcontroller.Extragigs);
router.post('/getallyourgigs',auth,gigcontroller.getallyourgigs);
router.post('/listbycategory',auth,gigcontroller.listbycategory)

module.exports = router;