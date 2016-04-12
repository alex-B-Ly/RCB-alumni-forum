var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var routes = require('./controllers/router');
var User = require('./models/user.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./config/connection.js');
var PORT = process.env.PORT || 8080;
//var cfg = require('./config.js');
var flash = require('connect-flash');
var methodOverride = require('method-override');

var app = express();

//require packages for authentication
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var serveStatic = require('serve-static');
var passportLocalMongoose = require('passport-local-mongoose'); //handles salting and hashing of passwords.
//remove bcrypt


//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//middleware for authentication
app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveStatic(path.join(__dirname, 'public')));
//app.use(passport.initialize());
//app.use(passport.session());

//configure passport-local-mongoose
var User = require('./models/user.js');
//use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
//use static serialize and deserialize of model in LocalStrategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//mongoose connection here, and done.
mongoose.createConnection('mongodb://localhost/RCB_alumni_db');


// ROUTES
var routes = require('./controllers/router.js');
//var routes = require('./controllers/index.js');
app.use('/', routes);
var User = require('./models/user.js');

app.listen(PORT, function() {
  console.log('listening on ', + PORT);
});