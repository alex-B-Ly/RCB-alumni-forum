var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
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
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);