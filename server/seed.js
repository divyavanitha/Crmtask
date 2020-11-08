const mongoose = require('mongoose'); 
const async = require("async");
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const admin_data = require('./seeders/admin');
const countries_data = require('./seeders/countries');
const states_data = require('./seeders/states');
const cities_data = require('./seeders/cities');
const categories_data = require('./seeders/categories');
const subcategories_data = require('./seeders/subcategories');
const deliverytimes_data = require('./seeders/deliverytimes');
const languages_data = require('./seeders/languages');
const menus_data = require('./seeders/menus');
const packages_data = require('./seeders/packages');
const pages_data = require('./seeders/pages');
const skills_data = require('./seeders/skills');
const slides_data = require('./seeders/slides');
const users_data = require('./seeders/users');
const settings_data = require('./seeders/settings');

const Schema = mongoose.Schema;

const { Admin } = require('./models/admin');
const { Country } = require('./models/country');
const { State } = require('./models/state');
const { City } = require('./models/city');
const { Category } = require('./models/category');
const { SubCategory } = require('./models/SubCategory');
const { DeliveryTime } = require('./models/DeliveryTime');
const { Language } = require('./models/language');
const { Menu } = require('./models/Menu');
const { Package } = require('./models/Package');
const { Page } = require('./models/page');
const { Skill } = require('./models/skill');
const { Slide } = require('./models/Slide');
const { User } = require('./models/user');
const { Setting } = require('./models/setting');
  
dotenv.config(); 
// Database connection 
mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}).then().catch((e) => console.log('Connection Failure...', e));

let admins = []

let countries = []

let states = []

let cities = []

let categories = []

let subcategories = []

let deliverytimes = []

let languages = []

let menus = []

let packages = []

let pages = []

let skills = []

let slides = []

let users = []


async function seed() {

	await async.each(admin_data, async function iteratee(admin, next) {
		const salt = await bcrypt.genSalt(10);
	    admin.password = await bcrypt.hash(admin.password, salt);
		await admins.push(  new Admin({name: admin.name, email: admin.email, password: admin.password })  )
	})
	
	/*await async.each(countries_data, function iteratee(country, next) {
		countries.push(  new Country({_id: country.id, name: country.name, countryCode: country.sortname, phoneCode: country.name, currency: country.name})  )
	})

	await async.each(states_data, function iteratee(state, next) {
		states.push(  new State({_id: state.id, name: state.name, countryId: Schema.Types.ObjectId(state.country_id), timezone: state.name})  )
	})

	await async.each(cities_data, function iteratee(city, next) {
		cities.push(  new City({_id: city.id, name: city.name, countryId: Schema.Types.ObjectId(city.state_id), stateId: Schema.Types.ObjectId(city.state_id) })  )
	})*/

	await async.each(categories_data, async function iteratee(category, next) {
		await categories.push(  new Category({name: category })  )
	})

	await async.each(await subcategories_data.subs(), async function iteratee(subcategory, next) {
		await subcategories.push(  new SubCategory({name: subcategory.name, category: subcategory.category })  )
	})

	await async.each(deliverytimes_data, async function iteratee(deliverytime, next) {
		await deliverytimes.push(  new DeliveryTime({name: deliverytime })  )
	})

	await async.each(languages_data, async function iteratee(language, next) {
		await languages.push(  new Language({name: language.name, code: language.code })  )
	})

	await async.each(await menus_data.menus(), async function iteratee(menu, next) {
		await menus.push(  new Menu({title: menu.title, subTitle: menu.subTitle, layoutPhoto: process.env.APP_URL+menu.layoutPhoto, category: menu.category, subCategory: menu.subCategory })  )
	})

	await async.each(packages_data, async function iteratee(package, next) {
		await packages.push(  new Package({name: package })  )
	})

	await async.each(pages_data, async function iteratee(page, next) {
		await pages.push(  new Page({title: page.title, content: page.content, url: page.url })  )
	})

	await async.each(skills_data, async function iteratee(skill, next) {
		await skills.push(  new Skill({name: skill })  )
	})

	await async.each(await slides_data.slides(), async function iteratee(slide, next) {
		await slides.push(  new Slide({title: slide.title, description: slide.description, layoutPhoto: process.env.APP_URL+slide.layoutPhoto, category: slide.category, subCategory: slide.subCategory  })  )
	})

	await async.each(users_data, async function iteratee(user, next) {
		const salt = await bcrypt.genSalt(10);
	    user.password = await bcrypt.hash(user.password, salt);
		await users.push(  new User({firstName: user.firstName, lastName: user.lastName, email: user.email, mobile: user.mobile, password: user.password })  )
	})


	await Admin.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Admin.insertMany(admins).then(function(){  console.log("Admin Seeded."); }).catch(function(error){  console.log(error); process.exit();  }); 

	/*await Country.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Country.insertMany(countries).then(function(){  console.log("Country Seeded."); }).catch(function(error){  console.log(error); process.exit();  }); 

	await State.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await State.insertMany(states).then(function(){  console.log("State Seeded."); }).catch(function(error){  console.log(error); process.exit();  }); 

	await City.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await City.insertMany(cities).then(function(){  console.log("City Seeded.") }).catch(function(error){  console.log(error); process.exit();  });*/ 

	await Category.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 
	
	await Category.insertMany(categories).then(function(){  console.log("Categories Seeded."); }).catch(function(error){  console.log(error); process.exit();  }); 
	
	await SubCategory.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await SubCategory.insertMany(subcategories).then(function(){  console.log("Sub Categories Seeded."); }).catch(function(error){  console.log(error); process.exit();  });
	
	await DeliveryTime.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await DeliveryTime.insertMany(deliverytimes).then(function(){  console.log("Delivery Times Seeded."); }).catch(function(error){  console.log(error); process.exit();  });
	
	await Language.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Language.insertMany(languages).then(function(){  console.log("Languages Seeded."); }).catch(function(error){  console.log(error); process.exit();  });
	
	await Menu.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Menu.insertMany(menus).then(function(){  console.log("Menus Seeded."); }).catch(function(error){  console.log(error); process.exit();  });
	
	await Package.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Package.insertMany(packages).then(function(){  console.log("Packages Seeded."); }).catch(function(error){  console.log(error); process.exit();  });
	
	await Page.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Page.insertMany(pages).then(function(){  console.log("Pages Seeded."); }).catch(function(error){  console.log(error); process.exit();  });
	
	await Skill.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Skill.insertMany(skills).then(function(){  console.log("Skills Seeded."); }).catch(function(error){  console.log(error); process.exit();  });

	await Slide.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Slide.insertMany(slides).then(function(){  console.log("Slides Seeded."); }).catch(function(error){  console.log(error); process.exit();  });

	await User.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await User.insertMany(users).then(function(){  console.log("Users Seeded."); }).catch(function(error){  console.log(error); process.exit();  });

	await Setting.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Setting.create(settings_data).then(function(){  console.log("Setting Seeded.") }).catch(function(error){  console.log(error); process.exit();  }); 

	process.exit();

}

 seed() ;