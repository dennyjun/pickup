let db = require('../db/db.js');
let Sequelize = db.Sequelize;
let User = require('./usersModel.js');
let Location = require('./locationsModel.js');

module.exports = (() => {  
  let Event = db.define('event', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    details: {
      type: Sequelize.STRING
    },
    maxParticipants: {
      type: Sequelize.INTEGER,
      defaultValue: 2
    },
    time: {
      type: Sequelize.DATE,
    }
  }, {
    timestamps : true
  });

  Event.belongsTo(User);
  Event.belongsTo(Location);

  Event.sync();
  //Event.sync({force:true});
  return Event;
})();