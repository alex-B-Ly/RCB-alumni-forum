var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var logger = require('morgan');
var db = require('./config/connection.js');
var PORT = process.env.PORT || 8080;

var app = express();

// MIDDLEWARE
// for logging, parsing, and session handling
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

//initalizing passport and restore auth state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static('public'));

app.use(logger('dev'));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//  extended: false
//}));

// config local strategy for passport to use
//require a verify function which gets the credentials
//('email' and 'password') submit by the user. function must verify that the password is correct
//then invoke cb with a user object, which will be set as req.user in route handlers after auth
passport.use(new Strategy(
  function(email, password, cb) {
    db.users.findByEmail(email, function (err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

//config passport authenticated session persistence
//to restore auth state across http reqs, passport needs to serialize users into and deserialize users
//out of the session. supply user ID when serializing, query user record by id from mongodb when deserializing
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// ROUTES
var routes = require('./controllers/router.js');
app.use('/', routes);

//defining routes 
app.get('/',
  function (req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function (req, res){
    res.render('login');
  });

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res){
    res.redirect('/');
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/studentprofilepage',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res){
    res.render('profile', { user: req.user });
  });

app.get('/messageboardpage',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res){
    res.render('messageboard', { user: req.user });
  });  


app.listen(PORT, function(){
  console.log('listening on ',PORT);
});