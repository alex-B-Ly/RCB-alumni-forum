var express = require('express');

var router = express.Router();

// MODELS
var User = require('../models/user.js');

// HOMEPAGE
router.get('/', function(req, res){
  res.sendFile(process.cwd() + '/public/homepage.html');
});

// REGISTER
router.post('/register', function(req, res){
  var newUser = new User(req.body);

  newUser.save(function(err, doc){
    if(err){
      console.log(err);
    }else{
      res.send(doc);
    }
  });
});

// LOGIN


module.exports = router;