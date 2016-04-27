var mongoose = require('mongoose');
console.log("This ran");
console.log(process.env.MONGODB_URI);
var db = process.env.MONGODB_URI;


module.exports = mongoose.connect(db);