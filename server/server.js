
//******************************************************************************
// Modules

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let router = require('./router.js');
let controllers = require('./controllers/controllersRoute.js');


//******************************************************************************

//______________________________________________________________________________
// Config
app.use(bodyParser.json());


//______________________________________________________________________________
// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 
    'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name');
  next();
});


// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
// Routes
app.use(express.static(__dirname + '/../client'));
router(app, controllers).init();

// require('./models/usersModel.js').create({
//   name: 'denny'
// });

app.get('*', function(req, res) {
  res.sendFile(path.resolve('client', 'index.html'))
});

// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
// Boot server
let port = process.env.PORT || 3000;
app.listen(port);
console.log('Server tuning into Port ' + port);

