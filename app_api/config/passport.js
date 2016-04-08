//require necessary packages
var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var User = mongoose.model('User');

//define strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // return if user isnt in db
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // return if password is incorrect
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // if credentials are correct, return user object
      return done(null, user);
    });
  }      
));