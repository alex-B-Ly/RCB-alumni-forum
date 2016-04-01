var mongoose = require('mongoose');
var db = 'mongodb://localhost/rcb_alumni_db';

module.exports = mongoose.connect(db);