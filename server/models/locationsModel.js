let db = require('../db/db.js');
let Sequelize = db.Sequelize;

module.exports = (() => {  
  let Location = db.define('location', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    street: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.FLOAT(10, 6)
    },
    lng: {
      type: Sequelize.FLOAT(10, 6)
    }
  }, {
    timestamps : true
  });

  Location.sync();
  //Location.sync({force:true});
  return Location;
})();