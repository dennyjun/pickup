let db = require('../db/db.js');
let Sequelize = db.Sequelize;
let Event = require('./eventsModel.js');
let User = require('./usersModel.js');

module.exports = (() => {  
  let UserEvent = db.define('userEvent', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER
    },
    eventId: {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps : true
  });

  UserEvent.sync();
  //UserEvent.sync({force:true});
  return UserEvent;
})();