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
    
  });

  router.post('/signup', (req, res) => {
    return authController.signup(req, res);
  });

  router.post('/login', (req, res) => {
    return authController.login(req, res);
  });

  router.put('/', (req, res) => {

  });

  router.delete('/', (req, res) => {
    // used to delete user, would have to add a button for this
  });


  return usersController;
})();