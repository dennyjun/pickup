let db = require('../db/db.js');
let User = require('./usersModel.js');

module.exports = (() => {
  let Session = db.define('session', {
    sid: {
      type: db.Sequelize.STRING,
      primaryKey: true
    },
    expires: {
      type: db.Sequelize.DATE
    },
    data: {
      type: db.Sequelize.STRING(50000)
    }
  }, {
    timestamps: true
  });

  Session.sync();
  //Session.sync({force:true});
  return Session;
})();