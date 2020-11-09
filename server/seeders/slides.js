
const mongoose = require('mongoose'); 
const { SubCategory } = require('../models/SubCategory');
const dotenv = require('dotenv');


dotenv.config(); 

mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}).then().catch((e) => console.log('Connection Failure...', e));

const slides = async () => {

	//const logo = await SubCategory.findOne({name: "Logo Design"});

	let slideData = [];

	slideData.push({ title: "Hire expert freelancers for any job, Online", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget fermentum orci. Nulla sit amet suscipit justo, sit amet dapibus dui.", layoutPhoto: "/public/images/slide/1.jpg", category: null, subCategory: null  });

	slideData.push({ title: "Maecenas hendrerit fermentum pulvinar", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget fermentum orci. Nulla sit amet suscipit justo, sit amet dapibus dui.", layoutPhoto: "/public/images/slide/2.jpg", category: null, subCategory: null });


	return slideData

}
exports.slides = slides;