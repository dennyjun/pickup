const Authentication = require('./controllers/authController');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
// const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app, routes) => {
  return {
    init: () => {
      for(let path in routes) {
        app.use(path, routes[path]);
      }
    },

    initSecured: () => {
      for(let path in routes) {
        app.use(path, requireAuth, routes[path]);
      }
    }
  };
};