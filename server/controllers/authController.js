let User = require('../models/usersModel');
let jwt = require('jwt-simple');
let passport = require('passport');
let passportJwt = require('passport-jwt');
let bcrypt = require('bcrypt');
require('dotenv').config()

// use passport and passport jwt

// Create function that uses JWT encode and the secret which is in the config file

// Use bcrypt to hash password in users model file before user gets saved

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

module.exports = (() => {
  function signup(req, res) {
    const username = req.body.username;
    const hashedPassword = hashPassword(req.body.password);

    if(!username || !req.body.password) {
      return res.status(422).send({ error: "You must enter both a username and password."});
    }

    return hashedPassword
    .then((hashword) => {
      return User.findOrCreate( { where: {username: username }, defaults: { username: username, password: hashword.hash } })
      .spread((user, created) => {
        if(created) {
          return res.status(200).send("Account successfully created.");
        } else {
          return res.status(200).send("Username already exists, please try another.");
        }
      });
    });
  };

  function login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
      return res.status(422).send({ error: "You must enter both a username and password."});
    }

    User.findOne( { where: { username: username } })
    .then((userData) => {
      return userData.password;
    })
    .then((resp) => {
      return comparePassword(password, resp);
    })
    .then((pwCheck) => {
      if(pwCheck) {
        res.send({ token: tokenForUser(username)});
      } else {
        res.send("Invalid password");
      }
    })
    .catch((err) => {
      res.status(404).send({ error: "Unknown error."});
    })

  };

  return {
    signup: signup,
    login: login
  }
})();




  // let checkIfExists = (table, username) => {
  //   return table.count( { where: {username: username }})
  //   .then((count) => {
  //     if(count !== 0) {
  //       return true
  //     }
  //     return false;
  //   });
  // };

  // change to findOrCreate
//   checkIfExists(User, username)
//   .then((exists) => {
//     if(exists) {
//       res.status(200).send("This username is already in use, try another.");
//     }

//     let newUser = {
//       username: req.body.username,
//       password: req.body.password
//     }

//     addUser(req, res, User, newUser);
//   })
// // Check to see if user filled out both fields

// // Check if user exists
// // mySQL equivalent to findOne, pass in user variable to check if it exists in DB, second argument a callback which takes error or existingUser arguments

// // If user exists, return error
// // return error status code and send an error object with message

// // If user does not exist, create and save user record
// // create a new user using user model with email and password
// // save username to the database
// // callback with error or responding to request indicating that the user was created

//   // Respond to request indicating user was created with TOKEN
//   // 
// }

