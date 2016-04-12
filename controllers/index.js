var express = require('express');
var passport = require('passport');
var User = require('../models/user.js');
var router = express.Router();

console.log('were here in index.js');

router.get('/', function (req, res) {
  console.log('in root get route');
  
  res.render('index', { user: req.user });
});

router.get('/register', function (req, res) {
    res.render('register', { });
});

router.post('/register', function (req, res){
  User.register(new User, ({ email : req.body.email }), req.body.password, function(err, User) {
    if (err) {
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
  });
});

router.get('/login', function (req, res) {
   res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});

router.get('/studentprofilepage',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res){
    res.render('profile', { user: req.user });
  });

router.get('/messageboardpage',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res){
    res.render('messageboard', { user: req.user });
  });  

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function (req, res) {
  res.status(200).send("pong!");
});

module.exports = router;