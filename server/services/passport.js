const passport = require('passport');
const User = require('../models/usersModel');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
require('dotenv').config();
const authController = require('../controllers/authController');

// Create local JWT strategy
const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
  // Verify the username and password, call done with the user if correct username and password, otherwise call done with false
  User.findOne( { where: { username: username } }, (err, user) => {
    if(err) {
      return done(err);
    }
    if(!user) {
      return done(null, false);
    }
    
    return authController.comparePassword(password, user.password)
    .then((resp) => {
      if(resp) {
        return done(null, user);
      }
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('token'),
  secretOrKey: process.env.SECRET
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if user ID in the payload exists in the DB, if it does call done with the user, otherwis call done without a user object

  User.findById(payload.sub, (err, user) => {
    if(err) {
      return done(err, false); 
    }
    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});


// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

// In authentication router file
// Import authentication controller
// Import passportService from this file
// import passport

// requireAuth = passport.authenticate('jwt', { session: false });

// On get request to root route, add requireAuth middleware

