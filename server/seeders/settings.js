const dotenv = require('dotenv');

dotenv.config();

module.exports = [{
	"site": {
		"title": "CRM",
		"description": "CRM Application",
		"logo": process.env.APP_URL+"/public/images/logo.png",
		"favicon": process.env.APP_URL+"/public/images/favicon.png",
		"email": "support@crm.com",
		"mobile": "9874563210",
		"copyright": "Crm 2020. All Rights Reserved.",
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
	
}]