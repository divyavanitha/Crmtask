const express = require('express');
const router = express.Router();
//const translate = require('google-translate-api');
 
router.get('/other',async(req,res) => {
    console.log("come here englishy");
    res.json({data:"come herre"})
})
        
router.get('/english',async(req,res) => {
    translate('Ik spreek Engels', {to: 'en'}).then(data => {
    console.log(data.text);
    // res.json({transulated:data.text})
    
    //=> I speak English
    console.log(data.from.language.iso);
    //=> nl
}).catch(err => {
    console.error(err);

})})

module.exports = router;
