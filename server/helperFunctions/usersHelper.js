let db = require('../db/db.js');
let Users = require('../models/usersModel.js');

module.exports = (function() {
  let getUserData = function(request, response, table, username) {
    table.findOne(username)
    .then((data) => {
      response.status(200).send(data);
    })
    .catch((err) => {
      response.status(500).send(err.message);
    });
  };

  return {
    getUserData: getUserData
  };
})();