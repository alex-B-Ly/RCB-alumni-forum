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
router.post('/login', function(req, res){
  User.findOne({ email: req.body.email }, function(err, user){
    if(err){throw err}

    // TODO Get data back and use Angular to manipulate it in the page.  Users must be authenticated and session used.
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

// GET STUDENTS
router.get('/getstudents', function(req, res){
  User.find({}, function(err, users){
    if(err){throw err}
    // TODO Manipulate users data so it doesn't send out sensitive info like passwords
    var userInfo = [];
    
    for(var i=0; i<users.length; i++){
      var fName = users[i].firstName;
      var lName = users[i].lastName;
      var sect = users[i].section;

      var theUser = {
        firstName: fName,
        lastName: lName,
        section: sect
      }

      userInfo.push(theUser);
    }
    
    res.send(userInfo);
  }); 
});



module.exports = router;