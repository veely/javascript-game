const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const PORT = 3001;
let id = 0;
let playerData = {};
let clients = [];
let lobbies = {};
let count = 0;

canvasWidth = 750;
canvasHeight = 400;

let ballSpeed = 4;

let ballData = [
                 { type: 'ball', x: canvasWidth/2, y: canvasHeight - 23, dx: ballSpeed, dy: ballSpeed },
                 { type: 'ball', x: canvasWidth/2, y: 23, dx: -ballSpeed, dy: -ballSpeed }
               ];

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', function connection(ws) {
  playerData[id] = null;
  ws.send(JSON.stringify({ type: 'id', id: id }));
  id++;

  console.log('Clients connected: ' + wss.clients.size);
  clients.push(ws);
  if (clients.length === 2) {
    lobbies[count] = [clients[0], clients[1]];
    clients = [];
    lobbies[count].map((client, index) => {
      client.send(JSON.stringify(ballData[index]));
      client.send(JSON.stringify({ type: 'lobby', id: count, player: index }));
    }); 
    console.log(clients.length);
    count++;
    wss.broadcast({ type: 'start' });
  } 
  ws.on('message', function incoming(message) {
    let data = JSON.parse(message);
    switch(data.type) {
      case 'paddle':
        playerData[data.client_id] = data.position;
        if (data.player === 0) {
          lobbies[data.lobby_id][1].send(JSON.stringify({ type: 'opponent', position: playerData[data.client_id] }));
        } else if (data.player === 1) {
          lobbies[data.lobby_id][0].send(JSON.stringify({ type: 'opponent', position: playerData[data.client_id] }));
        }
        break;
      case 'ball':
        let newBallData = {
          type: 'ball',
          x: canvasWidth-data.x,
          y: canvasHeight-data.y,
          dx: -data.dx,
          dy: -data.dy
        }
        if (data.playerID === 0) {
          lobbies['0'][1].send(JSON.stringify(newBallData));
        } else if (data.playerID === 1) {
          lobbies['0'][0].send(JSON.stringify(newBallData));
        }
        break;
      default:
        console.log(data);
        break;
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
    console.log('Clients connected: ' + wss.clients.size);
  });
});