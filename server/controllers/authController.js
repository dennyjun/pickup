let User = require('../models/usersModel');
let template = require('./controllerTemplate.js');
let authHelper = require('../helperFunctions/authHelper.js');

module.exports = (() => {
  let authController = template.clone({
    path: '/auth'
  });

  let router = authController.router;

  router.post('/signup', (req, res) => {
    const username = req.body.username;
    const hashedPassword = authHelper.hashPassword(req.body.password);

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
  });

  router.post('/login', (req, res) => {
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
      return authHelper.comparePassword(password, resp);
    })
    .then((pwCheck) => {
      if(pwCheck) {
        res.send({ token: authHelper.tokenForUser(username)});
      } else {
        res.send("Invalid password");
      }
    })
    .catch((err) => {
      res.status(404).send({ error: "Unknown error."});
    })
  });

  return authController;
})();

