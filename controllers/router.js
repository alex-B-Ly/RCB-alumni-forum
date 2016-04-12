var express = require('express');
var router = express.Router();

// MODELS
var User = require('/models/user.js');

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
router.post('/login', function(req, res){
  User.findOne({ email: req.body.email }, function(err, user){
    if(err){throw err}
       
    if(!user){
      console.log('user does not exist');
      res.send(err);
    }else{
      console.log('user exists');
      if(user.password === req.body.password){
        var userInfo = {
          firstName: user.firstName,
          lastName: user.lastName
        }
        res.send(userInfo);
        console.log('welcome');
      }else{
        console.log('Credentials do not work.');
        res.send(err);
      }
    }
  });
});      