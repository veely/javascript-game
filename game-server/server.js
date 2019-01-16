const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const PORT = 3001;
let id = 0;
let playerData = {};
let clients = [];

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', function connection(ws) {
  console.log('Clients connected: ' + wss.clients.size);
  clients.push(ws);
  ws.on('message', function incoming(message) {
    let data = JSON.parse(message);
    switch(data.type) {
      case 'paddle':
        playerData[data.id] = data.position;
        // if (playerData.id === 0) {
          clients[1].send(JSON.stringify({ type: 'paddle', id: 0, position: playerData['0'] }));
        // }
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



class Paddle {
  constructor(lives, speed, canvas) {
    this.lives = lives;
    this.speed = speed;
    this.height = 13;
    this.width = 75;
    this.x = (canvas.width - this.width) / 2;
  }

  drawPaddle(ctx, canvas) {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height - 10, this.width, this.height);
    ctx.fillStyle = "#ff6666";
    ctx.fill();
    ctx.closePath();    
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }
}