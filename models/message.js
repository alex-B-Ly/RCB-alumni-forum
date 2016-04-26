var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  message:{
    type: String,
    required: true
  },
  time:{
    type: Date,
    default: Date.now
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  username:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);