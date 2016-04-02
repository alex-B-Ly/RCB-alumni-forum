var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var db = require('./config/connection.js');
var PORT = process.env.PORT || 8080;

var app = express();

// MIDDLEWARE
app.use(express.static('public'));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// ROUTES
var routes = require('./controllers/router.js');
app.use('/', routes);

app.listen(PORT, function(){
  console.log('listening on ',PORT);
});