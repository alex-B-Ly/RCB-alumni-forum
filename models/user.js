var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
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

UserSchema.pre('save', function(next) {
  var user = this;

  //only hash passwords that havent been modified/are new
  if (!user.isModified('password')) return next();

  //generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next (err);
  

    //hash password with salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next (err);
    
      //override cleartxt password with hashed password
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

//set virtual field to be displayed on client side
var UserSchema = new Schema({
  name: {
      first: String,
      last: String
     }
  }, {
   toObject: {
   virtuals: true
   },
   toJSON: {
   virtuals: true
   }
 });
   
 var User = mongoose.model('User', UserSchema);

 var theTeach = new User({
    name:  { first: 'Darryl', last: 'Mendonez' }
  });

 //define a virtual attribute, name.full
 console.log('theTeach.name.full');
 
//declare virtual attribute name.full on the Schema, User
 UserSchema
 .virtual('name.full')
 .get(function() {
    return this.name.first + '  ' + this.name.last;
 });
 .set(function (setFullNameTo) {
   var split = setFullNameTo.split('  ')
   , firstName = split[0]
   , lastName = split[1];

   this.set('name.first', firstName);
   this.set('name.last', lastName);
  });

// invoke 

 theTeach.set('name.full', 'The Teach');

//save the doc, then name.first and name.last will be
//changed in mongodb, but the mongodb doc will not have persisted
//a name.fill key or value to the db

theTeach.save(function (err) {
  User.findById(theTeach._id, function (err, found) {
    console.log(found.name.first); // 'The'
    console.log(found.name.last); // 'Teach'
  });
});


UserSchema.set('toJSON', { getters: true, virtuals: true});



module.exports = mongoose.model('User', UserSchema);