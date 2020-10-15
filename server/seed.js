const mongoose = require('mongoose'); 
var async = require("async");
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

var admin_data = require('./seeders/admin');
var countries_data = require('./seeders/countries');
var states_data = require('./seeders/states');
var cities_data = require('./seeders/cities');
var settings_data = require('./seeders/settings');
/*var coupons_data = require('./se_dataeders/coupons');
var users_data = require('./seeders/users');
var deliveryTime_data = require('./seeders/delivery');
var languages_data = require('./seeders/languages');
var pages_data = require('./seeders/pages');
var skills_data = require('./seeders/skills');
var categories_data = require('./seeders/categories');
var subCategories_data = require('./seeders/subCategories');*/
const Schema = mongoose.Schema;

const { Admin } = require('./models/admin');
const { Country } = require('./models/country');
const { State } = require('./models/state');
const { City } = require('./models/city');
const { Language } = require('./models/language');
const { Skill } = require('./models/skill');
const { Setting } = require('./models/settings');
  
dotenv.config(); 
// Database connection 
mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}).then().catch((e) => console.log('Connection Failure...', e));

var admins = []

var countries = []
async.each(countries_data, function iteratee(country, next) {
	countries.push(  new Country({_id: country.id, name: country.name, countryCode: country.sortname, phoneCode: country.name, currency: country.name})  )
})

var states = []
async.each(states_data, function iteratee(state, next) {
	states.push(  new State({_id: state.id, name: state.name, countryId: Schema.Types.ObjectId(state.country_id), timezone: state.name})  )
})

var cities = []
async.each(cities_data, function iteratee(city, next) {
	cities.push(  new City({_id: city.id, name: city.name, countryId: Schema.Types.ObjectId(city.state_id), stateId: Schema.Types.ObjectId(city.state_id) })  )
})

async function seed() {
	
	await async.each(admin_data, async function iteratee(admin, next) {
		const salt = await bcrypt.genSalt(10);
	    admin.password = await bcrypt.hash(admin.password, salt);
		await admins.push(  new Admin({name: admin.name, email: admin.email, password: admin.password })  )
	})
/*
	await Admin.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Admin.insertMany(admins).then(function(){  console.log("Admin Seeded."); }).catch(function(error){  console.log(error); process.exit();  }); 

	await Country.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Country.insertMany(countries).then(function(){  console.log("Country Seeded."); }).catch(function(error){  console.log(error); process.exit();  }); 

	await State.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await State.insertMany(states).then(function(){  console.log("State Seeded."); }).catch(function(error){  console.log(error); process.exit();  }); 

	await City.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await City.insertMany(cities).then(function(){  console.log("City Seeded.") }).catch(function(error){  console.log(error); process.exit();  }); 
*/
	await Setting.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Setting.insertOne(settings_data).then(function(){  console.log("Setting Seeded.") }).catch(function(error){  console.log(error); process.exit();  }); 

	process.exit();

}

 seed() ;