const express = require('express');
const router = express.Router();
var moment = require('moment-timezone');


router.get('/timezonename',async(req,res) => {
    try {
      
        const timezone="Asia/Calcutta"
        var fz=moment().tz(timezone).format("HH:mm DD MMM")
        console.log(fz);
        var allzonelist=moment.tz.names()
        res.json({allzonelist:allzonelist,timedate:fz})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server')

    }
} );

router.get('/test',async(req,res) => {
    console.log("come here englishy");
    res.json({data:"come herre"})
})
        


module.exports = router;