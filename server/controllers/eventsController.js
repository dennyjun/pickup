let Event = require('../models/eventsModel.js');
let Location = require('../models/locationsModel.js');
let User = require('../models/usersModel.js');
let UserEvent = require('../models/usersEventsModel.js');
let template = require('./controllerTemplate.js');
let _ = require('lodash');
let Sequelize = require('../db/db.js').Sequelize;

module.exports = (() => {
  let eventsController = template.clone({
    path: '/api/events'
  });

  let router = eventsController.router;
  router.get('/', (req, res) => {
    Event.findAll({
        include: [User, Location]
      })
      .then((results) => {
        return _.map(results, (result) => {
          let event = result.dataValues;
          event.user = event.user.dataValues;
          event.location = event.location.dataValues;
          event.participants = [event.user.name];                // Need more participants
          return event;
        });
      })
      .then((events) => {
        res.send(events);
      })
      .catch((error) => {
        console.error('Failed to get events', error);
        res.status(500).send(error);
      });
  });

  router.post('/', (req, res) => {
    Location.findOrCreate({
      where: Sequelize.and(
        {street: req.body.address}, 
        {name: req.body.location}
      ),
      defaults: {
        name: req.body.location,
        street: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng
      }
    }).then((results) => {
      let location = results[0].dataValues;
      return Event.create({
        name: req.body.name,
        type: req.body.sport,
        details: req.body.rules,
        maxParticipants: req.body.playersNeeded,
        time: req.body.time,
        userId: 1,                               // need to be able to get current user id
        locationId: location.id
      }).then((event) => {
        return UserEvent.create({
          userId: event.userId,
          eventId: event.id
        });
      });
    }).then(() => {
      res.send('Event created successfully.');
    }).catch((error) => {
      console.error('Failed to create event', error);
      res.status(500).send(error);
    });
  });

  router.put('/', (req, res) => {

  });
  router.delete('/', (req, res) => {

  });


  return eventsController;
})();