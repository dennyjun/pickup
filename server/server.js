
//***********************************Modules**************************************************************************

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');
var polls = require('./routes/polls.js')


//******************************************************************************

//____________________________________CONFIG____________________________________

var port = process.env.PORT || 3000;



app.use(bodyParser.json());

app.use(express.static('../client'))
app.use('/api/polls/', polls);



// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
//CORS

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 
    'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name');
  next();
});

// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +

//Boot server -----------------------------------------------------------

app.listen(port);

console.log('Server tuning into Port ' + port);
