const winston = new (require('./config/winston'));

var express = require('express');
// const auth = require("../middlewares/auth");

const passport = require('passport');
// require('../config/passport')(passport)

var router = express.Router();

const setupController = require('./controllers/setup.controller');

// mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
//     .then(() => console.log('Connected to MongoDb...'))
//     .catch((e) => console.log('Connection Failure...', e));



const addSettings = async (db, { domain }) => {
    if (domain && (domain.includes('https://') || domain.includes('http://'))) {
        await db.collection('settings').updateOne(
            {},
            {
                $set: {
                    domain
                }
            },
            { upsert: true }
        );
        winston.info(`- Set domain: ${domain}`);
    }
};


(async () => {
    let client = null;
    let db = null;

    try {
        client = await MongoClient.connect(
            mongodbConnection,
            CONNECT_OPTIONS
        );
        db = client.db(dbName);
        winston.info(`Successfully connected to ${mongodbConnection}`);
    } catch (e) {
        winston.error(`MongoDB connection was failed. ${e.message}`);
        return;
    }

    const domain = process.argv.length > 3 ? process.argv[3] : null;

    await addSettings(db, {
        domain
    });

    client.close();
})();

// router.use('setup',function(req, res) {
//     return 1;
//   })



router.post('/addsetup', setupController.addSetup);
router.get('/getallsetup', setupController.getAllSetup);
router.get('/getbyidsetup/:setupId', setupController.getByIdSetup);
router.put('/updatesetup/:setupId', setupController.updateSetup);
router.delete('/deletesetup/:setupId', setupController.deleteSetup);


module.exports = router;
