const passport = require('passport');
const User = require('../models/usersModel');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
require('dotenv').config()

// can use a passport strategy to verify a user with JWT or another strategy to verify username and password

// SETUP OPTIONS for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('token'),
  secretOrKey: process.env.SECRET
};

// Create local JWT strategy
const localOptions = { usernameField: username };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  Verify the username and password, call done with the user if correct email and password, otherwise call done with false
  User.findOne( { where: { username: username } }, (err, user) => {
    if(err) {
      return done(err);
    }
    if(!user) {
      return done(null, false);
    }
  });
});

// Create JWT strategy
// const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if user ID in the payload exists in the DB, if it does call done with the user, otherwis call done without a user object

  // FindbyId in the user table
  // ex.
  // User.findById(payload.sub, (err, user) => {
  //  if(err) {
  //    return done(err, false); 
  //  }
  //  if(user) {
  //    done(null, user);
  //  } else {
  //    done(null, false);
  //  }
  // });
  // });


// Tell passport to use this strategy
// passport.use(jwtLogin);

// In authentication router file
// Import authentication controller
// Import passportService from this file
// import passport

// requireAuth = passport.authenticate('jwt', { session: false });

// On get request to root route, add requireAuth middleware

