const mongoose = require('mongoose'); 
const async = require("async");
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const admin_data = require('./seeders/admin');
const users_data = require('./seeders/users');
const settings_data = require('./seeders/settings');

const Schema = mongoose.Schema;


const { Admin } = require('./models/admin');
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
let users = []


async function seed() {


	await async.each(admin_data, async function iteratee(admin, next) {
		const salt = await bcrypt.genSalt(10);
	    admin.password = await bcrypt.hash(admin.password, salt);

		await admins.push(  new Admin({name: admin.name, email: admin.email, password: admin.password })  )
	})


	await async.each(users_data, async function iteratee(user, next) {
		const salt = await bcrypt.genSalt(10);
	    user.password = await bcrypt.hash(user.password, salt);
		await users.push(  new User({firstName: user.firstName, lastName: user.lastName, email: user.email, mobile: user.mobile, password: user.password })  )
	})


	await Admin.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Admin.insertMany(admins).then(function(){  console.log("Admin Seeded."); }).catch(function(error){  console.log(error); process.exit();  }); 

	await User.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await User.insertMany(users).then(function(){  console.log("Users Seeded."); }).catch(function(error){  console.log(error); process.exit();  });

	await Setting.deleteMany({}).then(function(){  }).catch(function(error){  console.log(error) }); 

	await Setting.create(settings_data).then(function(){  console.log("Setting Seeded.") }).catch(function(error){  console.log(error); process.exit();  });


	process.exit();

}

 seed() ;