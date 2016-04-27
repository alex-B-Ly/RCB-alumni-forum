require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var db = require('./config/connection.js');
var PORT = process.env.PORT || 8080;


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// MIDDLEWARE
app.use(express.static('public'));

app.use(logger('dev'));

app.use(session({
  secret: 'supersecrethorses',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 6 * 60 * 60 * 1000
  }
}));
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// ROUTES
var routes = require('./controllers/router.js');
app.use('/', routes);


// SOCKET
io.on('connection', function(socket){
  console.log('a user connected');
});

io.on('connection', function (socket) {
  socket.on('message', function(data){
    io.sockets.emit('spreadMessage', data);
  });
});

server.listen(PORT, function(){
  console.log('listening on ',PORT);
});