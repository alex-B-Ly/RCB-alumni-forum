var express = require('express');
var bcrypt = require('bcryptjs');
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
router.post('/login', function(req, res){
  User.findOne({ email: req.body.email }, function(err, user){
    if(err){throw err}

    // TODO Use passport and bcrypt to check passwords.
    if(!user){
      console.log('user does not exist');
      res.send(err);
    }else{
      console.log('user exists');
      
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if(err){
          throw err
        }else if(result === false){
          console.log('get outta here!');
          res.send(err);
        }else if(result === true){
          console.log('passwords match');
          var userInfo = {
            firstName: user.firstName,
            lastName: user.lastName
          }
          res.send(userInfo);
        }
      });      
    }

  });
});

// GET STUDENTS
router.get('/getstudents', function(req, res){
  User.find({}, function(err, users){
    if(err){throw err}
    var userInfo = [];
    
    for(var i=0; i<users.length; i++){
      var fName = users[i].firstName;
      var lName = users[i].lastName;
      var sect = users[i].section;
      var userId = users[i]._id;
      var userProfile = users[i].profile;

      var theUser = {
        firstName: fName,
        lastName: lName,
        section: sect,
        id: userId,
        profile: userProfile
      }

      userInfo.push(theUser);
    }

    res.send(userInfo);
  }); 
});




module.exports = router;