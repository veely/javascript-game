const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const PORT = 3001;
let id = 0;
let playerData = {};
let clients = [];

ballStart = { x: 300, y: 200 };

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
  console.log('Clients connected: ' + wss.clients.size);
  if (wss.clients.size === 2) {
    wss.broadcast({ type: 'start' });
  } 
  clients.push(ws);
  ws.on('message', function incoming(message) {
    let data = JSON.parse(message);
    switch(data.type) {
      case 'paddle':
        playerData[data.id] = data.position;
        if (data.id === 0) {
          clients[1].send(JSON.stringify({ type: 'opponent', id: 0, position: playerData['0'] }));
        } else if (data.id === 1) {
          clients[0].send(JSON.stringify({ type: 'opponent', id: 1, position: playerData['1'] }));
        }
        console.log(playerData);
        break;
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
    console.log('Clients connected: ' + wss.clients.size);
  });
  
  playerData[id] = null;
  ws.send(JSON.stringify({ type: 'id', id: id }));
  id++;
});