var express = require('express');
var path = require('path');
var routes = require('./controllers/router');
var User = require('./models/user.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./config/connection.js');
var PORT = process.env.PORT || 8080;
var methodOverride = require('method-override');

var app = express();


//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//middleware for authentication
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveStatic(path.join(__dirname, 'public')));



// ROUTES
var routes = require('./controllers/router.js');

app.use('/', routes);

var User = require('./models/user.js');

app.listen(PORT, function() {
  console.log('listening on ', + PORT);
});