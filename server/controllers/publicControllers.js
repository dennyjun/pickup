let authController = require('./authController.js');

module.exports = (() => {
  let controllers = [
    authController
  ];
  let router = {};
  controllers.forEach((controller) => {
    router[controller.path] = controller.router;
  });
  return router;
})();