
const { User, validate } = require('./../models/user');
const { Country } = require('./../models/country');
const { State } = require('./../models/state');
const { City } = require('./../models/city');
const { Language } = require('./../models/language');
const { Skill } = require('./../models/skill');

const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const helper = require('../services/helper.js');
const db = require('../services/model.js');
dotenv.config({ path: __dirname + '/../../.env' });
const tokenList = {};

exports.login = async (req, res) => {

    try {
        const schema = Joi.object().options({ abortEarly: false }).keys({
            email: Joi.string().required().label("Email"),
            password: Joi.string().required().min(6).label("Password")
        }).unknown(true);

        const { error } = schema.validate(req.body);
        const errors = { };
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = (err.message).replace(/"/g, "");
            }
        }

        if (error) res.status(422).json( helper.response(  { status: 422, error : errors }   ));

        let user = await User.findOne({ email: req.body.email });
        if (!user) res.status(422).json( helper.response(  { status: 422, message: 'Invalid credentials' }   ));

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) res.status(422).json( helper.response(  { status: 422, message: 'Invalid credentials' }   ));

        user.deviceType = req.body.device_type;
        user.deviceToken = req.body.device_token;
        const result = await user.save();

        let payload = _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'mobile', 'wallet', 'country', 'city', 'state', 'description', 'headline', 'profilePhoto', 'coverPhoto']);

        const token = user.generateAuthToken(payload);
        const refreshToken = user.generateRefreshToken(payload);

        payload.token = 'Bearer ' + token;
        tokenList[refreshToken] = payload;

        payload.refreshToken =  refreshToken;

        const data = { user: payload };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                const response = helper.response({ status: 422, error : err.errors[i].message });
                return res.status(response.statusCode).json(response);
            }
        } else {
            const response = helper.response({ status: 422, error : err });
            return res.status(response.statusCode).json(response);
        }
    }

};

exports.register = async (req, res) => {

    try {
        const schema = Joi.object().options({ abortEarly: false }).keys({
            first_name: Joi.string().required().label("First Name"),
            last_name: Joi.string().required().label("Last Name"),
            email: Joi.string().email().required().label("Email"),
            mobile: Joi.number().min(10).integer().required().label("Mobile"),
            password: Joi.string().required().min(6).label("Password"),
            confirm_password: Joi.any().equal(Joi.ref('password')).required().label("Confirm Password")
        }).unknown(true);

        const { error } = schema.validate(req.body);
        const errors = { };
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = (err.message).replace(/"/g, "");
            }
        }

        if (error) return res.status(422).json( helper.response(  { status: 422, error : errors }   ));

        let email = await User.findOne({ email: req.body.email });
        if (email) return res.status(422).json( helper.response(  { status: 422, message: 'Email already exists'  }   ));

        let mobile = await User.findOne({ mobile: req.body.mobile });
        if (mobile) return res.status(422).json( helper.response(  { status: 422, message: 'Mobile already exists'  }   ));

        const user = new User({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            deviceType: req.body.device_type,
            deviceToken: req.body.device_token,
            referralId: Math.random().toString(36).slice(2)
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        let verify = Math.floor((Math.random() * 10000000) + 1);
        const result = await user.save();

        let payload = _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'mobile', 'wallet']);

        const token = user.generateAuthToken(payload);

        payload.token = 'Bearer ' + token;

        const data = { user: payload };

        const response = helper.response({ data });

        //await helper.sendMail({to: req.body.to, subject: req.body.subject, message: req.body.message});

        return res.status(response.statusCode).json(response);

            /*function (error, user) {

            let payload = _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'mobile']);

        const token = user.generateAuthToken(payload);

        payload.token = 'Bearer ' + token;

        const data = { user: payload };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);*/


            /* if (error) {
                console.log(error)
            }
            else {
                let mailOption = {
                    from: 'skumaran449@gmail.com', // sender this is your email here
                    to: `${req.body.email}`, // receiver email2
                    subject: "Account Verification",
                    html: `<h1>Hello Friend Please Click on this link<h1><br><hr><p>HELLO I AM 
            THECODERANK I MAKE THIS TUTORIAL FOR MY SUBSCRIBERS AND OUR FRIENDS.</p>
            <br><a href="http://localhost:5000/api/auth/verification/?verify=${verify}&id=${user._id}">CLICK ME TO ACTIVATE YOUR ACCOUNT</a>`
                }


            } */
        //})

    } catch (err) {
        console.log(err);
        if (err[0] != undefined) {
            for (i in err.errors) {
                const response = helper.response({ status: 422, error : err.errors[i].message });
                return res.status(response.statusCode).json(response);
            }
        } else {
            let message = null;
            let errors = { };
            if(err._message) message = err._message;
            if(err.errors) {
                for (let key in err.errors) {
                    if (Object.keys(err.errors[key]).length > 0) {
                        let removePath = (err.errors[key].properties.message).replace(/Path /g, "");
                        errors[err.errors[key].properties.path] = (removePath).replace(/`/g, "");
                    }
               }
            }
            
            const response = helper.response({ status: 422, message: message, error : errors });
            return res.status(response.statusCode).json(response);
        }
    }
};

exports.changePassword = async (req, res) => {
        let userid = req.user._id;
        const schema = Joi.object().options({ abortEarly: false }).keys({
            old_password: Joi.string().label("Old Password"),
            new_password: Joi.string().label("New Password"),
            confirm_password: Joi.string().label("Confirm Password"),
        }).unknown(true);

        const { error } = schema.validate(req.body);
        const errors = { };
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = (err.message).replace(/"/g, "");
            }
        }

        if (error) return res.status(422).json( helper.response(  { status: 422, error : errors }   ));

            try {
                let user = await db._find(User, {_id: req.user._id});
                const salt = await bcrypt.genSalt(10);

                let newPassword = await bcrypt.hash(req.body.new_password, salt);

                if (await bcrypt.compare(req.body.old_password, user.password) != true) {

                    var response = helper.response({ status: 400, message: 'Check your old password.', data: [] });
                   
                } else if (await bcrypt.compare(req.body.new_password, user.password)) {
                    var response = helper.response({ status: 400, message: 'Please enter a password which is not similar then current password.', data: [] });
                } else {
                    await db._update(User, {_id: req.user._id}, {$set: {password: newPassword}});
                    var response = helper.response({ status: 200, message: 'Password updated successfully.', data: [] });
                }

                return res.status(response.statusCode).json(response);
            } catch (err) {
                console.log(err)
                if (err[0] != undefined) {
                    for (i in err.errors) {
                        const response = helper.response({ status: 422, error : err.errors[i].message });
                        return res.status(response.statusCode).json(response);
                    }
                } else {
                    let message = null;
                    let errors = { };
                    if(err._message) message = err._message;
                    if(err.errors) {
                        for (let key in err.errors) {
                            if (Object.keys(err.errors[key]).length > 0) {
                                let removePath = (err.errors[key].properties.message).replace(/Path /g, "");
                                errors[err.errors[key].properties.path] = (removePath).replace(/`/g, "");
                            }
                       }
                    }
                    
                    const response = helper.response({ status: 422, message: message, error : errors });
                    return res.status(response.statusCode).json(response);
                }
            }
}

exports.social = async (req, res) => {
   
    try {
        const schema = Joi.object().options({ abortEarly: false }).keys({
            social_unique_id: Joi.string().label("Social Unique ID"),
            first_name: Joi.string().label("First Name"),
            last_name: Joi.string().label("Last Name"),
            email: Joi.string().email().label("Email"),
            mobile: Joi.number().min(10).integer().label("Mobile"),
            social_unique_id: Joi.string().required().label("Social Unique Id"),
        }).unknown(true);

        const { error } = schema.validate(req.body);
        const errors = { };
        if (error) {
            for (let err of error.details) {
                errors[err.path[0]] = (err.message).replace(/"/g, "");
            }
        }

        if (error) return res.status(422).json( helper.response(  { status: 422, error : errors }   ));

        let socialUniqueId = await User.findOne({ socialUniqueId: req.body.social_unique_id });
        if (socialUniqueId) {

            let payload = _.pick(socialUniqueId, ['_id', 'firstName', 'lastName', 'email', 'mobile', 'wallet']);

            const token = socialUniqueId.generateAuthToken(payload);

            payload.token = 'Bearer ' + token;

            const data = { user: payload };

            const response = helper.response({ data });

            return res.status(response.statusCode).json(response);

        }

        let email = await User.findOne({ email: req.body.email });
        if (email) return res.status(422).json( helper.response(  { status: 422, message: 'Email already exists'  }   ));

        let mobile = await User.findOne({ mobile: req.body.mobile });
        if (mobile) return res.status(422).json( helper.response(  { status: 422, message: 'Mobile already exists'  }   ));

        const user = new User({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            mobile: req.body.mobile,
            profilePhoto: req.body.profile_photo,
            loginBy: req.body.login_by,
            socialUniqueId: req.body.social_unique_id,
            deviceType: req.body.device_type,
            deviceToken: req.body.device_token,
        })

        let verify = Math.floor((Math.random() * 10000000) + 1);
        const result = await user.save();

        let payload = _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'mobile']);

        const token = user.generateAuthToken(payload);

        payload.token = 'Bearer ' + token;

        const data = { user: payload };

        const response = helper.response({ data });

        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err)
        if (err[0] != undefined) {
            for (i in err.errors) {
                const response = helper.response({ status: 422, error : err.errors[i].message });
                return res.status(response.statusCode).json(response);
            }
        } else {
            let message = null;
            let errors = { };
            if(err._message) message = err._message;
            if(err.errors) {
                for (let key in err.errors) {
                    if (Object.keys(err.errors[key]).length > 0) {
                        let removePath = (err.errors[key].properties.message).replace(/Path /g, "");
                        errors[err.errors[key].properties.path] = (removePath).replace(/`/g, "");
                    }
               }
            }
            
            const response = helper.response({ status: 422, message: message, error : errors });
            return res.status(response.statusCode).json(response);
        }
    }
};

exports.forgetpassword = async (req, res) => {
    try {
        const email = req.body.email

        User.findOne({
            email: email
        })
            .then(function (user) {
                if (!user) {
                    return throwFailed(res, 'No user found with that email address.')
                }

                let reset = Math.floor((Math.random() * 1000000000) + 1);

                let mailOption = {
                    from: 'skumaran449@gmail.com', // sender this is your email here
                    to: `${req.body.email}`, // receiver email2
                    subject: "Account Verification",
                    html: `<p>
                   To reset password , follow the link address</p>
                    <br><a href="http://localhost:5000/api/auth/passwordreset/?reset=${reset}&id=${user._id}">CLICK ME TO ACTIVATE YOUR ACCOUNT</a>`
                }
                
            })


    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(500).send({ error: err.name });
        }
    }
};

exports.passwordreset = async (req, res) => {
    try {

        await User.findById(req.query.id).exec()
            .then(async function (user) {
                const salt = await bcrypt.genSalt(10);
                console.log("salt", salt);

                user.password = await bcrypt.hash(req.body.password, salt);
                console.log("user.password ", user.password);
                if (user) {

                    console.log("user.id", user.id);
                    User.findOneAndUpdate({

                        _id: user.id

                    }, { password: user.password }, { new: true }).then(
                        (data) => {
                            // if (err) {
                            //     console.log(err)
                            // }
                            if (data) {
                                let mailOption = {
                                    from: 'skumaran449@gmail.com', // sender this is your email here
                                    to: `${data.email}`, // receiver email2
                                    subject: "Password reset sucesssfully",
                                    html: `<h1>Password changed sucessfully</h1>
                            `
                                }


                            } else {
                                res.send("error in inserting data")
                            }
                        }
                    )

                }

            })
    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(500).send({ error: err.name });
        }
    }
};


exports.verification = async (req, res) => {

    try {

        await User.findByIdAndUpdate(req.query.id, { status: true, is_active: true }, { new: true })
            .then(data => {
                if (!data) {
                    return res.status(404).send({
                        message: "id is not found " + req.params.id
                    });
                }
                res.status(200).send({ message: "The account is verified sucessfully", data });
            })



    } catch (err) {
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(500).send({ error: err.name });
        }
    }

};


exports.refresh = async (req, res) => {

    try {

        let refresh_token = req.body.refresh_token;

        if( refresh_token && (refresh_token in tokenList)) {
            let user = await User.findOne({ email: tokenList[refresh_token]['email'] });

            const result = await user.save();

            let payload = _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'mobile', 'wallet']);

            const token = user.generateAuthToken(payload);
            const refreshToken = user.generateRefreshToken(payload);

            payload.token = 'Bearer ' + token;
            tokenList[refreshToken] = payload;

            payload.refreshToken =  refreshToken;

            const data = { user: payload };

            const response = helper.response({ data });
            return res.status(response.statusCode).json(response);

        } else {
            return res.status(401).json({
                "statusCode": 401,
                "title": "Unauthorised",
                "message": "Unauthorised",
                "data": {},
                "error": {}
            });
        }

    } catch (err) {
        
        return res.status(401).json({
            "statusCode": 401,
            "title": "Unauthorised",
            "message": "Unauthorised",
            "data": {},
            "error": {}
        });
    }

};


exports.country = async (req, res) => {
    try {
        let countries = await db._get(Country, { status: 1}, {createdAt: 0, updatedAt: 0 });

        const data = { countries };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }
};

exports.state = async (req, res) => {
    try {

        let states = await db._get(State, { status: 1, countryId: req.params.id}, {createdAt: 0, updatedAt: 0 });

        const data = { states };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }
};

exports.city = async (req, res) => {
    try {

        let cities = await db._get(City, { status: 1, stateId: req.params.id}, {createdAt: 0, updatedAt: 0 });

        const data = { cities };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }
};

exports.language = async (req, res) => {
    try {

        let languages = await db._get(Language, { status: 1}, {createdAt: 0, updatedAt: 0 });

        const data = { languages };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }
};

exports.skill = async (req, res) => {
    try {

        let skills = await db._get(Skill, { status: 1}, {createdAt: 0, updatedAt: 0 });

        const data = { skills };

        const response = helper.response({ data });
        return res.status(response.statusCode).json(response);

    } catch (err) {
        console.log(err);
    }
};


