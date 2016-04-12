var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose'); //handles hashing and salting of passwords
var Schema = mongoose.Schema;                                   //plus you can define user however you like

var User = new Schema({
  firstName:{
    type: String,
    required: true,
    trim: true
  },
  lastName:{
    type: String,
    required: true,
    trim: true
  },
  password:{
    type: String,
    required: true
  },
  email:{
    type: String,
    trim: true,
    required: true
  },
  section:{
    type: Number,
    trim: true,
    required: true
  },
  dateCreated:{
    type: Date,
    default: Date.now
  }
});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);