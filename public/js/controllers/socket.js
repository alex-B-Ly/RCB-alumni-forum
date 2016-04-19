var socket = io('http://localhost:8080');

socket.on('news', function (data) {
  console.log(data);
  socket.emit('message', {stuff: 'Here is your stuff.'});
});