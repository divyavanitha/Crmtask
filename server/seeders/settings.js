const dotenv = require('dotenv');

dotenv.config();

module.exports = [{
	"site": {
		"title": "Freelancer",
		"description": "Freelancer Application",
		"logo": process.env.APP_URL+"/public/images/logo.png",
		"favicon": process.env.APP_URL+"/public/images/favicon.png",
		"email": "support@freelancer.com",
		"mobile": "9874563210",
		"copyright": "©Freelancer 2020. All Rights Reserved.",
		"playstoreLink": "",
		"appstoreLink": ""
	},
	"socialLink": [{
		"name": "Facebook Link",
		"url": "",
		"picture": process.env.APP_URL+"/public/images/facebook.png"
	},{
		"name": "Google Plus Link",
		"url": "",
		"picture": process.env.APP_URL+"/public/images/google-plus.png"
	},{
		"name": "Twitter Link",
		"url": "",
		"picture": process.env.APP_URL+"/public/images/twitter.png"
	},{
		"name": "LinkedIn Link",
		"url": "",
		"picture": process.env.APP_URL+"/public/images/linkedin.png"
	},{
		"name": "Instagram Link",
		"url": "",
		"picture": process.env.APP_URL+"/public/images/instagram.png"
	},{
		"name": "Pinterest Link",
		"url": "",
		"picture": process.env.APP_URL+"/public/images/pinterest.png"
	}],
	"social": {
        "status": false,
        "facebookAppId": "",
        "googleClientId": "",
        "appleId": ""
    },
    "sms": {
        "status": false,
        "provider": "TWILIO",
        "sid": "",
        "token": "",
        "sender": ""
    },
    "mail": {
        "status": false,
        "service": "GMAIL",
        "username": "",
        "password": "",
        "from": ""
    },
    "payment": [{
         "status": false,
         "name": "STRIPE",
         "credentials": [{
            "name": "publishable_key",
            "value": ""
         },
         {
            "name": "secret_key",
            "value": ""
         },
         {
            "name": "currency",
            'value': ""
         }]
     }],
    "application": {
        "manualApproval": false,
        "editApproval": false,
        "manualBuyerRequestApproval": false,
        "referGig": false
    },
    "seller": {
        "newSellerRating": 0,
        "newSellerCompletedOrder": 0,
        "levelOneRating": 70,
        "levelOneCompletedOrder": 50,
        "levelTwoRating": 50,
        "levelTwoCompletedOrder": 30,
        "topRatedRating": 95,
        'topRatedCompletedOrder': 100
    },
    "gig": {
        "minimumWithdrawalPeriod": 0,
        "minimumGigPrice": 0,
        'minimumWithdrawalLimit': 1,
        "featuredGigPrice": 10,
        "featuredGigDuration": 10,
        "processingFee": 5
    },
    "pricing": {
        "commissionLevelOne": 15,
        "commissionLevelTwo": 10,
        "commissionTopRated": 5,
        "commission": 20
    }
}]