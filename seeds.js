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

userCreator('Axel', 'Lee', 'pass', 'a@g.com', 1027, 'Just another space monkey trying to make his way in the world.', 'Full Stack Developer', 'I develop cool stuff.', ['Mongo', 'Express', 'Angular', 'Node']);

userCreator('Jana', 'Bostrom', 'pass', 'jb@g.com', 1027, 'A Swedish girl who has an abnormal and borderline obsessive love for waffles.', 'Web Designer', 'I make nice looking things.', ['Photoshop', 'Sass', 'CSS', 'HTML', 'Lightroom', 'Illustrator', 'After Effects']);

userCreator('John', 'Doe', 'pass', 'jd@g.com', 1026, 'Who am I?', 'Back End Dev', 'Developer who specializes in PHP', ['HTML', 'CSS', 'PHP', 'Laravel', 'Database Theory']);

userCreator('Mara', 'Tanner', 'pass', 'mara@g.com', 1027, 'I have always loved horses.  Horses are my life.', 'Horse Trainer', 'I like horses and aspire to be a horse breeder and trainer.', ['Horses', 'More horses']);

userCreator('Admiral', 'Ackbar', 'itsatrap', 'itsatrap@rebels.net', 1026, 'I am an admiral who has helped the rebels defeat the Empire and am now helping the resistance fight off the First Order.', 'Rebel Admiral', '... IT\'s A TRAP!!!', ['Trap Detection', 'Rebellions', 'Troop Organization', 'Starship Command']);