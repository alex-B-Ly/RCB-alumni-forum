var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  section: {
    type: Number,
    trim: true,
    required: true
  },
  dateCreated: {
    type: Date,
  }
});

module.exports = mongoose.model('User', userSchema);