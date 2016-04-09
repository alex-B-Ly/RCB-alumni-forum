var mongoose = require('mongoose');
var db = require('./config/connection.js');
var User = require('./models/user.js');

function userCreator(fname, lname, pass, email, sect, profBio){
  var user = new User({
    firstName: fname,
    lastName: lname,
    password: pass,
    email: email,
    section: sect,
    profile:{
      bio: profBio
    }
  });
  user.save();
}

userCreator('Axel', 'Lee', 'intothevoid', 'axel@gmail.com', 1027, 'Just another space monkey trying to make his way in the world.');
userCreator('Jana', 'Bostrom', 'password', 'jb@yahoo.com', 1027, 'A Swedish girl who has an abnormal and borderline obsessive love for waffles.');
userCreator('John', 'Doe', 'unknown', 'jdoe@aol.com', 1026, 'Who am I?');
userCreator('Mara', 'Tanner', 'horserider', 'mara@gmail.com', 1027, 'I like horses and aspire to be a horse breeder and trainer.');
userCreator('Admiral', 'Ackbar', 'itsatrap', 'itsatrap@rebels.net', 1026, '... IT\'s A TRAP!!!');