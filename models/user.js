var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

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
  fullName: {
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

userSchema.pre('save', function(next) {
  var user = this;

  //only hash passwords that havent been modified/are new
  if (!user.isModified('password')) return next();

  //generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next (err);
  }

    //hash password with salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next (err);
    
      //override cleartxt password with hashed password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
});    
    

module.exports = mongoose.model('User', userSchema);