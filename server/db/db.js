module.exports = (() => {
  let Sequelize = require('sequelize');
  if(!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  return new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT
    }
  );
})();