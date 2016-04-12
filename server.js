var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var db = require('./config/connection.js');
var PORT = process.env.PORT || 8080;

var app = express();

// MIDDLEWARE
app.use(express.static('public'));

app.use(logger('dev'));

app.use(session({
  secret: 'youlovehorses',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 60 * 60 * 1000
  }
}));
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

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