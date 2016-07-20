var eventsController = require('./eventsController.js');
var locationsController = require('./locationsController.js');
var usersController = require('./usersController.js');

module.exports = (function(){
  var controllers = [
    eventsController,
    locationsController,
    usersController
  ];
  var router = {};
  controllers.forEach(function(controller) {
    router[controller.path] = controller.router;
  });
  return router;
})();