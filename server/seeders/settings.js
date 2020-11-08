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
        "provider": "Twilio",
        "sid": "",
        "token": "",
        "sender": ""
    },
    "mail": {
        "status": false,
        "service": "gmail",
        "username": "",
        "password": "",
        "from": ""
    },
    "payment": [{
         "status": false,
         "name": "Stripe",
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
     }]
}]