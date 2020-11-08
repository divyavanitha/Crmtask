
const mongoose = require('mongoose'); 
const { SubCategory } = require('../models/SubCategory');
const dotenv = require('dotenv');


dotenv.config(); 

mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}).then().catch((e) => console.log('Connection Failure...', e));

const menus = async () => {

	const logo = await SubCategory.findOne({name: "Logo Design"});
	const illustration = await SubCategory.findOne({name: "Illustration"});
	const photoshop = await SubCategory.findOne({name: "Photoshop Editing"});
	const social = await SubCategory.findOne({name: "Social Media Marketing"});
	const translation = await SubCategory.findOne({name: "Translation"});
	const voice = await SubCategory.findOne({name: "Voice Over"});

	let menuData = [];

	if(logo && logo._id) {

		menuData.push({ title: "Build Your Brand", subTitle: "Logo Design", layoutPhoto: "/public/images/menu/1604736882539_1.jpg", category: mongoose.Types.ObjectId(logo.category), subCategory: mongoose.Types.ObjectId(logo._id)  });

	}

	if(illustration && illustration._id) {

		menuData.push({ title: "Color Your Dreams", subTitle: "Illustration", layoutPhoto: "/public/images/menu/1604741938126_5.jpg", category: mongoose.Types.ObjectId(illustration.category), subCategory: mongoose.Types.ObjectId(illustration._id) });

	}

	if(photoshop && photoshop._id) {

		menuData.push({ title: "Hire A Designer", subTitle: "Photoshop Expert", layoutPhoto: "/public/images/menu/1604741944836_6.jpg", category: mongoose.Types.ObjectId(photoshop.category), subCategory: mongoose.Types.ObjectId(photoshop._id) });

	}

	if(social && social._id) {

		menuData.push({ title: "Reach More Customers", subTitle: "Social Media", layoutPhoto: "/public/images/menu/1604741922271_2.jpg", category: mongoose.Types.ObjectId(social.category), subCategory: mongoose.Types.ObjectId(social._id) });

	}

	if(translation && translation._id) {

		menuData.push({ title: "Go Global.", subTitle: "Translation", layoutPhoto: "/public/images/menu/1604741931637_4.jpg", category: mongoose.Types.ObjectId(translation.category), subCategory: mongoose.Types.ObjectId(translation._id) });

	}

	if(voice && voice._id) {

		menuData.push({ title: "The Perfect Voiceover", subTitle: "Voice Talent", layoutPhoto: "/public/images/menu/1604741952460_7.jpg", category: mongoose.Types.ObjectId(voice.category) });

	}

	return menuData

}
exports.menus = menus;