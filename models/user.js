var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    unique: true
  },
  lastName: {
    type: String,
    unique: true
  },
  userName: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    unique: true
  },
  section: {
    type: Number,
  },
  dateCreated: {
    type: Date,
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;