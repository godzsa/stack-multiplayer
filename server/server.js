var express = require('express');
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

function randomString() {
  return Date.now().toString();
}

var numberOfPlayersInActiveRoom = 0;
var actGame = randomString();
var game = {};
var firstPlayer="";

io.on('connection', function (socket) {
  console.log(socket.id,' connects');
  socket.on('JOIN_REQUEST', function (status) {

    if(socket.id == firstPlayer){
      console.log('doubleclick');
      return;
    }
    firstPlayer=socket.id;


    console.log('joined', socket.id);
    var gameId = actGame;
    socket.join(gameId);

    var playerId=numberOfPlayersInActiveRoom;

    if(numberOfPlayersInActiveRoom==0){
      game = status;
      game.gameId=gameId;
      game.player.myId=numberOfPlayersInActiveRoom;
    } else {
      game.player.myId=numberOfPlayersInActiveRoom;
    }

    socket.emit('JOIN_ACCEPTED', game);

    numberOfPlayersInActiveRoom++;
    if (numberOfPlayersInActiveRoom === 2) {
      io.to(gameId).emit('START_GAME');
      actGame = randomString();
      numberOfPlayersInActiveRoom = 0;
      game = {};
      firstPlayer="";
    };
  });


  socket.on('NEW_BLOCK',function(newBlock){
    socket.broadcast.to(newBlock.gameId).emit('SERVER_NEW_BLOCK',newBlock);
  });
  socket.on('SHARE_GRADIENT',function(grad){
    socket.broadcast.to(grad.gameId).emit('SET_GRADIENT',grad);
  });
});

console.log('Server listening on port 3000');

server.listen(3000);
