const express = require('express');
const router = express.Router();

const auth = require("./../middlewares/auth")
const postjobcontroller = require('../controllers/postjob.controller');

router.get('/', auth, postjobcontroller.usesfromtoken);
router.post('/createpostjob', auth, postjobcontroller.createpostjob);
router.delete('/deletepostjob/:postjobid', auth, postjobcontroller.deletepostjob);
router.get('/getallpostjob', auth, postjobcontroller.getallpostjob);
router.get('/getmyallpostjob', auth, postjobcontroller.getmyallpostjob);
router.get('/findpostjobbyid/:postjobid', auth, postjobcontroller.findpostjobbyid);

module.exports = router;
