const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/./../../.env' });
const opts = {};
const { User, validate } = require('../models/user');


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;


//module.exports = passport => { passport.use( new JwtStrategy(opts, (jwt_payload, done) => { User.findById(jwt_payload.id) .then(user => { if (user) { return done(null, user); } return done(null, false); }) .catch(err => console.log(err)); }) );};

module.exports = (passport) => {
  try {

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
      console.log(jwt_payload);
      await User.findById(jwt_payload.user_id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => {
        return done(null, false);
      });
    }));

    /* passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT
    },
      function (token, tokenSecret, profile, done) {
        console.log(profile);

        let userData = {
          email: profile.emails[0].value,
          name: profile.displayName,
          token: accessToken
        };
        done(null, userData);
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user);
        // }); 
      }
    ));

    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_REDIRECT
    },
      function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        // User.findOrCreate(..., function(err, user) {
        //   if (err) { return done(err); }
        //   done(null, user);
        // });
      }
    )); */

    /*  passport.serializeUser((user, done) => {
         done(null, user._id);
     });
      
     passport.deserializeUser((id, done) => {
         User.findById(id, (err, user) => {
             done(err, user);
         });
     });

     passport.use('admin-local', new localStrategy({usernameField: 'email'}, async (email, password, done) => {

         let user = await User.findOne({ email: email });
         if(!user) return done(null, false, {message: 'No user found!'} );
 
         const validPassword = await user.comparePassword(password);
         console.log(validPassword);
         if(!validPassword)  return done(null, false, {message: 'Incorrect Password!'} );

         return done(null, user );
 
     }));  */

  } catch (err) {
    console.log(err);
  }

} 