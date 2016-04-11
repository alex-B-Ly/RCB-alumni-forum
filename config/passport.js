var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('../models/user.js');

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-login', new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done){
    User.findOne({ email: req.body.email }, function(err, user){
    if(err){throw err}

    if(!user){
      console.log('user does not exist');
      done(null, false);
    }else{
      console.log('user exists.');
      
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if(err){
          throw err
        }else if(result === false){
          console.log('get outta here!');
          done(null, false);
        }else if(result === true){
          console.log('passwords match');
          done(null, user);
        }
      });      
    }

    });
  }));

}