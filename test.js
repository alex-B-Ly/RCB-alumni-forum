var mongoose = require('mongoose'),
  User = require('./models/user.js');

var connStr = 'mongodb://localhost:8080/mongoose-bcrypt-test';
mongoose.connect(connStr, function(err) {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
});

//new test user
var testUser = new User({
  fullName: 'John Smith',
  password: 'password'
});

//save user to db
testUser.save(function(err) {
  if (err) throw err;

  //fetch user, test password 
  User.findOne({ fullName: 'John Smith' }, function (err, user) {
    if (err) throw err;
  
      //test matching password
      user.comparePassword('password', function (err, isMatch) {
        if (err) throw err;
        console.log('password:', isMatch);  //password: true
      });

      //test bad password
      user.comparePassword('passwordz', function (err, isMatch) {
        if (err) throw err;
        console.log('passwordz:', isMatch); //passwordz: false
      });  
    });
  });
