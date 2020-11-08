const mongoose = require('mongoose'); 
const { Category } = require('../models/category');
const dotenv = require('dotenv');


dotenv.config(); 

mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}).then().catch((e) => console.log('Connection Failure...', e));

const subs = async () => {

	const graphics = await Category.findOne({name: "Graphics & Design"});
	const digital = await Category.findOne({name: "Digital Marketing"});
	const writing = await Category.findOne({name: "Writing & Translation"});
	const video = await Category.findOne({name: "Video & Animation"});
	const music = await Category.findOne({name: "Music & Audio"});
	const programming = await Category.findOne({name: "Programming & Tech"});
	const business = await Category.findOne({name: "Business"});
	const lifestyle = await Category.findOne({name: "Lifestyle"});

	let subcategories = [];

	if(graphics && graphics._id) {

		subcategories.push({name: "Logo Design", category: graphics._id});
		subcategories.push({name: "Business Cards & Stationery", category: mongoose.Types.ObjectId(graphics._id)});
		subcategories.push({name: "Illustration", category: mongoose.Types.ObjectId(graphics._id)});
		subcategories.push({name: "Cartoons Caricatures", category: mongoose.Types.ObjectId(graphics._id)});
		subcategories.push({name: "Flyers Posters", category: mongoose.Types.ObjectId(graphics._id)});
		subcategories.push({name: "Book Covers & Packaging", category: mongoose.Types.ObjectId(graphics._id)});
		subcategories.push({name: "Web & Mobile Design", category: mongoose.Types.ObjectId(graphics._id)});
		subcategories.push({name: "Social Media Design", category: mongoose.Types.ObjectId(graphics._id)});
		subcategories.push({name: "Banner Ads", category: mongoose.Types.ObjectId(graphics._id)});
		subcategories.push({name: "Photoshop Editing", category: mongoose.Types.ObjectId(graphics._id)});
		subcategories.push({name: "3D & 2D Models", category: mongoose.Types.ObjectId(graphics._id)});
		subcategories.push({name: "T-Shirts", category: mongoose.Types.ObjectId(graphics._id)});
		subcategories.push({name: "Presentation Design", category: mongoose.Types.ObjectId(graphics._id)});

	}

	if(digital && digital._id) {

		subcategories.push({name: "Social Media Marketing", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "SEO", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "Web Traffic", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "Content Marketing", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "Video Marketing", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "Email Marketing", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "Search & Display Marketing", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "Marketing Strategy", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "Web Analytics", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "Local Listings", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "Domain Research", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "E-Commerce Marketing", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "Mobile Advertising", category: mongoose.Types.ObjectId(digital._id)});
		subcategories.push({name: "Tutorial Creation", category: mongoose.Types.ObjectId(digital._id)});

	}

	if(writing && writing._id) {

		subcategories.push({name: "Resumes & Cover Letters", category: mongoose.Types.ObjectId(writing._id)});
		subcategories.push({name: "Proof reading & Editing", category: mongoose.Types.ObjectId(writing._id)});
		subcategories.push({name: "Translation", category: mongoose.Types.ObjectId(writing._id)});
		subcategories.push({name: "Creative Writing", category: mongoose.Types.ObjectId(writing._id)});
		subcategories.push({name: "Business Copywriting", category: mongoose.Types.ObjectId(writing._id)});
		subcategories.push({name: "Research & Summaries", category: mongoose.Types.ObjectId(writing._id)});
		subcategories.push({name: "Articles & Blog Posts", category: mongoose.Types.ObjectId(writing._id)});
		subcategories.push({name: "Press Releases", category: mongoose.Types.ObjectId(writing._id)});
		subcategories.push({name: "Transcription", category: mongoose.Types.ObjectId(writing._id)});
		subcategories.push({name: "Legal Writing", category: mongoose.Types.ObjectId(writing._id)});

	}

	if(video && video._id) {

		subcategories.push({name: "Whiteboard & Explainer Videos", category: mongoose.Types.ObjectId(video._id)});
		subcategories.push({name: "Intros & Animated Logos", category: mongoose.Types.ObjectId(video._id)});
		subcategories.push({name: "Promotional & Brand Videos", category: mongoose.Types.ObjectId(video._id)});
		subcategories.push({name: "Editing & Post Production", category: mongoose.Types.ObjectId(video._id)});
		subcategories.push({name: "Lyric & Music Videos", category: mongoose.Types.ObjectId(video._id)});
		subcategories.push({name: "Spokespersons & Testimonials", category: mongoose.Types.ObjectId(video._id)});

	}

	if(music && music._id) {

		subcategories.push({name: "Voice Over", category: mongoose.Types.ObjectId(music._id)});
		subcategories.push({name: "Mixing & Mastering", category: mongoose.Types.ObjectId(music._id)});
		subcategories.push({name: "Producers & Composers", category: mongoose.Types.ObjectId(music._id)});
		subcategories.push({name: "Singer-Songwriters", category: mongoose.Types.ObjectId(music._id)});
		subcategories.push({name: "Session Musicians & Singers", category: mongoose.Types.ObjectId(music._id)});
		subcategories.push({name: "Jingles & Drops", category: mongoose.Types.ObjectId(music._id)});
		subcategories.push({name: "Sound Effects", category: mongoose.Types.ObjectId(music._id)});

	}

	if(programming && programming._id) {

		subcategories.push({name: "WordPress", category: mongoose.Types.ObjectId(programming._id)});
		subcategories.push({name: "Website Builders & CMS", category: mongoose.Types.ObjectId(programming._id)});
		subcategories.push({name: "Ecommerce", category: mongoose.Types.ObjectId(programming._id)});
		subcategories.push({name: "Mobile Apps & Web", category: mongoose.Types.ObjectId(programming._id)});
		subcategories.push({name: "Desktop applications", category: mongoose.Types.ObjectId(programming._id)});
		subcategories.push({name: "Support & IT", category: mongoose.Types.ObjectId(programming._id)});
		subcategories.push({name: "Chatbots", category: mongoose.Types.ObjectId(programming._id)});
		subcategories.push({name: "Data Analysis & Reports", category: mongoose.Types.ObjectId(programming._id)});
		subcategories.push({name: "Convert Files", category: mongoose.Types.ObjectId(programming._id)});
		subcategories.push({name: "Databases", category: mongoose.Types.ObjectId(programming._id)});
		subcategories.push({name: "User Testing", category: mongoose.Types.ObjectId(programming._id)});

	}

	if(business && business._id) {

		subcategories.push({name: "Virtual Assistant", category: mongoose.Types.ObjectId(business._id)});
		subcategories.push({name: "Market Research", category: mongoose.Types.ObjectId(business._id)});
		subcategories.push({name: "Business Plans", category: mongoose.Types.ObjectId(business._id)});
		subcategories.push({name: "Branding Services", category: mongoose.Types.ObjectId(business._id)});
		subcategories.push({name: "Legal Consulting", category: mongoose.Types.ObjectId(business._id)});
		subcategories.push({name: "Financial Consulting", category: mongoose.Types.ObjectId(business._id)});
		subcategories.push({name: "Business Tips", category: mongoose.Types.ObjectId(business._id)});
		subcategories.push({name: "Presentations", category: mongoose.Types.ObjectId(business._id)});
		subcategories.push({name: "Career Advice", category: mongoose.Types.ObjectId(business._id)});
		subcategories.push({name: "Flyer Distribution", category: mongoose.Types.ObjectId(business._id)});

	}

	if(lifestyle && lifestyle._id) {

		subcategories.push({name: "Online Lessons", category: mongoose.Types.ObjectId(lifestyle._id)});
		subcategories.push({name: "Arts & Crafts", category: mongoose.Types.ObjectId(lifestyle._id)});
		subcategories.push({name: "Relationship Advice", category: mongoose.Types.ObjectId(lifestyle._id)});
		subcategories.push({name: "Health, Nutrition & Fitness", category: mongoose.Types.ObjectId(lifestyle._id)});
		subcategories.push({name: "Astrology & Readings", category: mongoose.Types.ObjectId(lifestyle._id)});
		subcategories.push({name: "Spiritual & Healing", category: mongoose.Types.ObjectId(lifestyle._id)});
		subcategories.push({name: "Family & Genealogy", category: mongoose.Types.ObjectId(lifestyle._id)});
		subcategories.push({name: "Collectibles", category: mongoose.Types.ObjectId(lifestyle._id)});
		subcategories.push({name: "Greeting Cards & Videos", category: mongoose.Types.ObjectId(lifestyle._id)});
		subcategories.push({name: "Viral Videos", category: mongoose.Types.ObjectId(lifestyle._id)});
		subcategories.push({name: "Pranks & Stunts", category: mongoose.Types.ObjectId(lifestyle._id)});
		subcategories.push({name: "Celebrity Impersonators", category: mongoose.Types.ObjectId(lifestyle._id)});
		subcategories.push({name: "Presentation Design", category: mongoose.Types.ObjectId(lifestyle._id)});

	}

	return subcategories

}
exports.subs = subs;