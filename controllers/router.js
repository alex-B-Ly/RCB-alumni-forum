var express = require('express');
var bcrypt = require('bcryptjs');
var passport = require('passport');
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
router.post('/login', function(req, res, next){
  passport.authenticate('local-login', function(err, user){
    if(err){
      res.send(err);
    }else if(!user){
      res.send(err);
    }else{
      req.login(user, function(err){
        var userInfo = {
          firstName: user.firstName,
          lastName: user.lastName
        }
        res.send(userInfo);  
      });
    }
    
  })(req, res, next);
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
    console.log(req.session);
    res.send(userInfo);
  }); 
});

// PROFILE EDIT USER INFO
router.get('/profedit', function(req, res){
  User.findOne({_id:req.session.passport.user}, function(err, user){
    if(err){throw err}

    var userInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      profile: user.profile
    }

    res.send(userInfo);
  });
})

// PROFILE ADD SKILL
// router.post('/addskill', function(req, res){
//   var newSkill ={
//     skill: req.body.newSkill
//   }

  // User.findOneAndUpdate({_id: req.session.passport.user}, {$pushAll: {'profile.skills': newSkill}}, function(err){
  //   if(err){throw err}
  // });
// });

// PROFILE UPDATE
router.post('/updateprof', function(req, res){
  var passedInfo = req.body;
  // Find user and update
  User.findOneAndUpdate({_id: req.session.passport.user}, passedInfo ,function(err, user){
    if(err){throw err}
  });

  User.findOneAndUpdate({_id: req.session.passport.user}, {$pushAll: {'profile.skills': req.body.newSkills}}, {upsert: true}, function(err){
    if(err){throw err}
  });

  console.log(req.body);
});

// SHOW PROFILE
router.get('/user/:id', function(req, res){
  User.findOne({_id:req.params.id}, function(err, user){
    if(err){throw err}

    var userInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      section: user.section,
      email: user.email,
      profile: user.profile
    }
    res.send(userInfo);
  });
});


module.exports = router;