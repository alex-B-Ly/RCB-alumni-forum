var mongoose = require('mongoose');
var db = require('./config/connection.js');
var User = require('./models/user.js');

function userCreator(fname, lname, pass, email, sect, profBio, jobTitle, jobDescription, skillList){
  var user = new User({
    firstName: fname,
    lastName: lname,
    password: pass,
    email: email,
    section: sect,
    profile:{
      bio: profBio,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      skills: skillList
    }
  });
  user.save();
}

userCreator('Axel', 'Lee', 'test', 'a@g.com', 1027, 'Just another space monkey trying to make his way in the world.', 'Full Stack Developer', 'I develop cool stuff.', ['Mongo', 'Express', 'Angular', 'Node']);

// userCreator('Jana', 'Bostrom', 'password', 'jb@yahoo.com', 1027, 'A Swedish girl who has an abnormal and borderline obsessive love for waffles.', 'Web Designer', 'I make nice looking things.');

// userCreator('John', 'Doe', 'unknown', 'jdoe@aol.com', 1026, 'Who am I?', 'Back End Dev', 'Developer who specializes in PHP');

// userCreator('Mara', 'Tanner', 'horserider', 'mara@gmail.com', 1027, 'I like horses and aspire to be a horse breeder and trainer.');

// userCreator('Admiral', 'Ackbar', 'itsatrap', 'itsatrap@rebels.net', 1026, '... IT\'s A TRAP!!!');