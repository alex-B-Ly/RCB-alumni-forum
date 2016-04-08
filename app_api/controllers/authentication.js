var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

//take data from submitted form and create new mongoose model instance
module.exports.register = function(req, res) {
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  
  //call setPassword method to add salt and hash
  user.setPassword(req.body.password);
  
  //save instance as record to db, gen JWT, send JWT inside json response
  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
};