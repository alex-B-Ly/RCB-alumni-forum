var express = require('express');
var passport = require('passport');
var router = express.Router();

//models
var User = require('../models/user.js');
console.log('were here in index.js');

//homepage
router.get('/', function (req, res) {
  console.log('in root get route');
  res.sendFile(process.cwd() + '/public.homepage.html');
});

router.post('/register', function (req, res){
  User.register(new User, (email : req.body.email), req.body.password, function (err, User) {
    if (err) {
      return res.sendFile(process.cwd() + '/register', { user : user });
    });

    passport.authenticate('local'), function (req, res) {
      if (err) {
       return res.redirect('/');
      }
    });
  });
});

router.get('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});

router.get('/getstudents',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res){
    res.sendFile(process.cwd() + './views/profileEdit.html', { user: req.user });
  });

router.get('/getmessages',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res){
   res.sendFile(process.cwd() + './views/messageboardpage.html', { user: req.user });
  });  

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function (req, res) {
  res.status(200).send("pong!");
});

module.exports = router;