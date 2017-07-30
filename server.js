// set up ======================================================================
var express  = require('express');                        // creando nuestro app w/ express
var app      = express(); 	                          //
var port     =  process.env.PORT || 9050;   		  // puerto
var morgan   = require('morgan');                         // log requests to the console (express4)
var bodyParser = require('body-parser');                  // pull information from HTML POST (express4)
var methodOverride = require('method-override');          // simulate DELETE and PUT (express4)

// configuration ===============================================================
app.use(express.static(__dirname + '/public'));           // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                   // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));      // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override'));        // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port : " + port);





  