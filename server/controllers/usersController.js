let User = require('../models/locationsModel.js');
let template = require('./controllerTemplate.js');

module.exports = (() => {
  let usersController = template.clone({
    path: '/api/users'
  });

  let router = usersController.router;
  router.get('/', (req, res) => {

  });
  router.post('/', (req, res) => {

  });
  router.put('/', (req, res) => {

  });
  router.delete('/', (req, res) => {

  });


  return usersController;
})();