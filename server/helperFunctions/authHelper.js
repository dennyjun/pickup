let jwt = require('jwt-simple');
let passport = require('passport');
let passportJwt = require('passport-jwt');
let bcrypt = require('bcrypt');
require('dotenv').config();

// use passport and passport jwt

// Create function that uses JWT encode and the secret which is in the config file

// Use bcrypt to hash password in users model file before user gets saved

exports.module = (() => {
  function hashPassword(password) {
    const saltRounds = 5;
    return new Promise((resolve, reject) => {
      return bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err) {
          res.send("There was an error encrypting your password.");
        }
        resolve({
          hash: hash
        });
      });
    })
  }

  function comparePassword(password, dbPassword) {
    return new Promise((resolve, reject) => {
      return bcrypt.compare(password, dbPassword, (err, response) => {
        resolve(response); 
      });
    });
  };

  function tokenForUser(user) {
    const time = new Date().getTime();
    return jwt.encode({ sub: user, iat: time }, process.env.SECRET);
  }

  return {
    hashPassword: hashPassword,
    comparePassword: comparePassword,
    tokenForUser: tokenForUser
  }
})();