var mongoose = require('mongoose');
var db = require('./config/connection.js');
var User = require('./models/user.js');

function userCreator(fname, lname, pass, email, sect){
  var user = new User({
    firstName: fname,
    lastName: lname,
    password: pass,
    email: email,
    section: sect
  });
  user.save();
}

userCreator('Axel', 'Lee', 'intothevoid', 'axel@gmail.com', 1027);
userCreator('Jana', 'Bostrom', 'password', 'jb@yahoo.com', 1027);
userCreator('John', 'Doe', 'unknown', 'jdoe@aol.com', 1026);
userCreator('Mara', 'Tanner', 'horserider', 'mara@gmail.com', 1027);
userCreator('Admiral', 'Ackbar', 'itsatrap', 'itsatrap@rebels.net', 1026);