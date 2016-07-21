let User = require('../models/usersModel.js');
let template = require('./controllerTemplate.js');
let usersHelper = require('../helperFunctions/usersHelper.js');
let authController = require('./authController.js');

module.exports = (() => {
  let usersController = template.clone({
    path: '/api/users'
  });

  let router = usersController.router;

  router.get('/:username', (req, res) => {
    let username =  req.params.username;
    
    User.findOne({ where: { username: username } })
    .then((user) => {
      if(user) {
        console.log("User found");
        res.status(200).send("User has been found!");
      } else {
        console.log("Not found");
        res.status(200).send("The user does not exist!");
      }
    })
    .catch((err) => {
      console.log("Error getting username");
      res.status(500).send(err.message);
    })
    // get user information using sequelize
    // login
    // console.log(req.body);
    // res.send("hnnnnnnnnnnng");
  });

  router.post('/:username', (req, res) => {
    // used for signup
    // let addUser = (req, res, table, newData) => {
    //   table.create(newData)
    //   .then((data) => {
    //     res.status(200).send(data);
    //   })
    //   .catch((err) => {
    //     res.status(500).send(err.message);
    //   });
    // };
    return authController.signup(req, res);
  });

  router.put('/', (req, res) => {

  });

  router.delete('/', (req, res) => {
    // used to delete user, would have to add a button for this
  });


  return usersController;
})();