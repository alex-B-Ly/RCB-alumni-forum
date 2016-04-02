var express = require('express');
var logger = require('morgan');
var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static('public'));

app.use(logger('dev'));

app.get('*', function(req, res) {
  res.sendFile(process.cwd() + '/public/views/homepage.html');
});

app.listen(PORT, function(){
  console.log('listening on ',PORT);
});