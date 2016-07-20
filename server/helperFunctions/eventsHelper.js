//_________________MODULES_______________________________

var db = require('../db/db.js');
var router = require('express').Router();
var Q = require('q')
//var connection = require('../db/db.js')

// This get will return an array of JSON games objects
// from and includes its location info.
exports.getGame = function(callback, params) {

  var check = 'SELECT * FROM Locations AS l JOIN Games AS g ON l.id = g.locations_id JOIN Players AS p ON g.id = p.games_id';
  
  //var checkValues = [params.sport, params.rules, params.time, params.location, params.currentPlayers, params.maxPlayers, params.created_by];

 db.query(check, function(err, data) {
    if (err) {
      console.error("error getting games db.getGame : ", err);
    }
    if (data) {
      callback(data)
    }
  })
}

//This post comes in from the games route and takes JSON object
// and stores it among the games and locations table
// The obect it stores should looks like this:
//  {
//    "sport" : "soccer",
//    "rules" : "11v11 Players",
//    "time" : "3:30 PM",
//    "location" : "The Field",
//    "originalPlayers" : 7,
//    "joinedPlayers" : "[]",
//    "playersNeeded" : 15,
//    "created_by" : "Jebroni",
//    "name" : "Futball",
//    "address" : "154 Field Ave",
//    "lat" : "34.7685748",
//    "lng" : "-99.678574"
//  }

exports.postGame = function(callback, params) {
  console.log("params in postGame", params);
  var check = 'SELECT * FROM Games WHERE sport = ? AND time = ?';
  var checkValues = [params.sport, params.time];
  var insertGames = "INSERT INTO Games (sport, rules, time, location, originalPlayers, created_by, locations_id) values (?, ?, ?, ?, ?, ?, ?);";
  var insertLocations = "INSERT INTO Locations (name, address, lat, lng) values (?, ?, ?, ?);";
  var insertLocationsValues = [params.name, params.address, params.lat, params.lng];
  var insertPlayers = "INSERT INTO Players (joinedPlayers, playersNeeded, games_id) values (?, ?, ?);";
  

 db.query(check, checkValues, function(err, data) {
    if (err) {
      console.error("game already in db, gamesHelper addGame : ", err).json({success: false});
    }
    if (data.length === 0) {
     db.query(insertLocations, insertLocationsValues,  function(err, locationData) {
      console.log("this is the data after game insert :", data);
        if (err) {console.error('error inserting into db, gamesHelper postGame :', err)}
        else {
          var insertGamesValues = [params.sport, params.rules, params.time, params.location, params.originalPlayers, params.created_by, locationData.insertId];
          db.query(insertGames, insertGamesValues, function(err, gameData) {
            if (err) { 
              console.error('error inserting location into db, gamesHelper postLocation')
             } 
             else {
              var insertPlayersValues = [params.joinedPlayers, params.playersNeeded, gameData.insertId ];
              db.query(insertPlayers, insertPlayersValues, function(err, data) {
                if (err) {
                  console.error("error inserting players to db, Helpers postGame", err);
                } else {
                  callback(data);
                  console.log("Games, locations, and players stored successfully");
                }
              })
             } 
          }) 
        }
      });
    } 
    //else { callback(data); console.log("Game successfully stored in db!") }
  });
}

exports.addPlayers = function(callback, params) {
  var insertJoinedPlayers = "UPDATE Players SET joinedPlayers = ? WHERE id = ?";
  var insertJoinedPlayersValues = [params.joinedPlayers, params.id];
  var insertPlayersNeeded = "UPDATE Players SET playersNeeded = ? WHERE id = ?";
  var insertPlayersNeededValues = [params.playersNeeded, params.id];
  var updatedGame = 'SELECT * FROM Locations AS l JOIN Games AS g ON l.id = g.locations_id JOIN Players AS p ON g.id = p.games_id WHERE l.id = ?';
  var updatesGameValues = [params.id]

  db.query(insertJoinedPlayers, insertJoinedPlayersValues, function(err, data) {
    if (err) {
      console.error("error updating players, helpers addPlayers ", err);
    } else {
      db.query(insertPlayersNeeded, insertPlayersNeededValues, function(err, data) {
        if (err) {
          console.error("error updating playersNeeded");
        } else {
          db.query(updatedGame, updatesGameValues, function(err, data) {
            if (err) {
              console.log('error updating game');
            } else {
              console.log('playersJoined update successfull');
              callback(data)
            }
          })
        }
      })
    }
  })
}

exports.deleteGame = function(callback) {


}

// exports.postLocation = function(callback, params) {
//   var check = 'SELECT * FROM Markers WHERE lat = ? and lng = ?';
//   var checkValues = [params.lat, params.lng];
//   var insert = "INSERT INTO Locations (name, address, lat, lng, type) values (?, ?, ?, ?, ?);";
//   var insertValues = [params.name, params.address, params.lat, params.lng, params.type]

//   db.query(check, checkValues, function(err, data) {
//     if (err) {
//       console.error("Location already in db, gamesHelper.addGameLocation", err);
//     } 
//     if (data.length === 0) {
//       db.query(insert, insertValues, function(err) {
//         if (err) { console.error("error inserting into db, gamesHelper.addGameLocation", err); }
//         else { callback(data); }
//       });
//     } 
//     else { callback(data); console.log("Location successfully stored in db"); }
//   });
// }



// router.post ('/pickups', function (req, res) {
//   var userId = req.body.user.id;
//   var pickup = req.body.pickup;

//   db.query('INSERT INTO Pickups SET  sport = ?, rules = ?, time = ?, player_max = ?, created_by = ?;',
//     [pickups.sport, pickups.rules, pickups.time, pickups.player_max, pickups.created_by],
//     function(err, result) {
//       if (err) {
//         console.error('error logging pickup to db', err)
//       } else {
//       db.query('SELECT * FROM Pickups WHERE id = ?;',
//         [result.insertId],
//         function(err, rows) {
//           res.status(201).json(rows[0]);
//         })
//       }
//     })
// });

// router.get('/pickups', function(req, res) {

//   db.query('SELECT sport, rules, time, player_max, created_by, created_at FROM pickups')
// })
