let db = require('../db/db.js');
let Sequelize = db.Sequelize;

module.exports = (() => {  
  let User = db.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  }, {
    timestamps : true
  });

  User.sync();
  // User.sync({force:true});
  return User;
})();