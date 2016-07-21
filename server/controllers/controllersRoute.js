let eventsController = require('./eventsController.js');
let locationsController = require('./locationsController.js');
let usersController = require('./usersController.js');

module.exports = (() => {
  let controllers = [
    eventsController,
    locationsController,
    usersController
  ];
  let router = {};
  controllers.forEach((controller) => {
    router[controller.path] = controller.router;
  });
  return router;
})();