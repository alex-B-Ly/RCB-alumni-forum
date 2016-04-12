var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var routes = require('./controllers/router');
var User = require('/models/user.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./config/connection.js');
var port = process.env.PORT || 8080;
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
var User = require('/models/user.js');
//use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
//use static serialize and deserialize of model in LocalStrategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//mongoose connection here, and done.
mongoose.createConnection('mongodb://localhost/RCB_alumni_db');

//require packages for MongoStore
//var settings = require('./controllers/settings');
//var connect = require('connect');  //using connect instead of express-session
//var MongoStore = require('connect-mongo-store')(connect);
//var store = new MongoStore('mongodb://localhost:27017/RCB_alumni_db', {cleanupInterval: 1000, ttl: 500})
//    store.on('connect', function() {
//      store.set('a', {a: 1}, function (err) {
//        setTimeout(function() {
//          store.get('a', function (err, sess) {
//                equal(sess, null, 'session cleaned up');
//                start()
//          })
//        }, 1100)
//      })
//    })
//  })

//mongoStore.on('connect', function() {
//  console.log('Store is ready to use.');
//})

//mongoStore.on('error', function(err) {
//  console.log('Store, why you ignore me?', err)
//})      

//require packages for socket.io
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
//var io = require('socket.io').listen(server); //pass a http.server instance
//server.listen(80);

//app.get('/', function(req, res) {
//  res.sendfile('index.html');
//})

//io.on('connection', function(socket) {
//  console.log('a user connected');
//});

//http.listen(8080, function() {
//  console.log('listening on *:8080');
//})

// MIDDLEWARE
//app.use(serveStatic('public')); //dont delete app wasnt defined
//app.use(flash()); //for flash messages stored in session //dont delete app wasnt defined
//app.use(methodOverride()); //app not defined
//app.use(router);


//to store sessons in mongostore:
//var links = '<p><a href="./public/homepage.html"</a> <a href="/views/messageboardpage.html"</a> <a href="/studentProfilePage.html"</a></p>';

//use the following to set up mongostore
//app.get('/public/homepage.html', function (req, res) {
  //add links to each path
//  var output = links;
//  req.session.lastPage += req.route.path + '<br>';
//  if(req.session.lastPage) {
//    output += '<h2>'+req.route.path+'</h2> past page was: ' + req.session.lastPage + '. ';
//  } else {
//    output += 'No last page defined';
//  }
//  res.send(output);
//});

//app.get('/views/messageboardpage.html', function (req, res) {
  //add links to each path
//  var output = links;
//  req.session.lastPage += req.route.path + '<br>';
//  if(req.session.lastPage) {
//    output += '<h2>'+req.route.path+'</h2> past page was: ' + req.session.lastPage + '. ';
//  } else {
//    output += 'No last page defined';
//  }
//  res.send(output);
//});

//app.get('/views/studentProfilePage.html', function (req, res) {
  //add links to each path
//  var output = links;
//  req.session.lastPage += req.route.path + '<br>';
//  if(req.session.lastPage) {
//    output += '<h2>'+req.route.path+'</h2> past page was: ' + req.session.lastPage + '. ';
//  } else {
//    output += 'No last page defined';
//  }
//  res.send(output);
//});

//save session back to the store, replacing contents on store with contents in memory
//useful when using web sockets, like socket.io
//req.session.save(function(err) {
  //session saved
//})

//app.get('/', route.index);
//app.get('/user', user.list);

// ROUTES
//var routes = require('./controllers/router.js');
var routes = require('./controllers/index.js');
//app.use('/', routes);
var User = require('/models/user.js');

app.listen(PORT, function() {
  console.log('listening on ', PORT);
});