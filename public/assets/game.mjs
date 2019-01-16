import { Ball } from './Ball.mjs';
import { Paddle } from './Paddle.mjs';

window.onload = function() {
  const canvas = document.getElementById("gameBoard");
  const ctx = canvas.getContext("2d");
  let client_id = null;

  let start = false;
  
  let rightPressed = false;
  let leftPressed = false;
  
  let score = 0;
  let lives = 3;
  let paddleSpeed = 5;
  
  let ballSpeed = 3;
  let ballRadius = 10;
  const brickRowCount = 4;
  const brickColumnCount = 8;
  const brickWidth = 75;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;
  const paddleHeight = 15;
  const paddleWidth = 75;
  
  var ball = new Ball(canvas.width/2, canvas.height - 23, ballRadius, ballSpeed);
  var paddle1 = new Paddle(lives, paddleSpeed, canvas, canvas.height - paddleHeight - 10, paddleHeight, paddleWidth);
  var paddle2 = new Paddle(lives, paddleSpeed, canvas, 10, paddleHeight, paddleWidth);
  
  var bricks = [];
  for (let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for (let r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: -100, y: -100, hit: false };
    }
  }
  
  const client = new WebSocket("ws://localhost:3001/");
  client.onopen = (openEvent) => {
    console.log('Connection established');
    client.onmessage = (event) => {
      let data = JSON.parse(event.data);
      switch(data.type) {
        case 'id':
          client_id = data.id;
          break;
        case 'opponent':
          paddle2.x = canvas.width-paddleWidth-data.position;
          break;
        case 'start':
          console.log("start");
          start = true;
          break;
      }
    };
  };

  function drawLives() {
    ctx.font = "16px Cambria";
    ctx.fillStyle = "#ff6666";
    ctx.fillText("Lives: "+paddle1.lives, canvas.width-65, 20);
  }

  function drawScore() {
    ctx.font = "16px Cambria";
    ctx.fillstyle = "#ff6666";
    ctx.fillText("Score: "+score, 13, 20);
  }

  function drawBricks() {
    for (let c=0; c<brickColumnCount; c++) {
      for (let r=0; r<brickRowCount; r++) {
        if (!bricks[c][r].hit) {
          let brickX = c*(brickWidth+brickPadding)+brickOffsetLeft;
          let brickY = r*(brickHeight+brickPadding)+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#ff6666";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function collisionDetection() {
    for (let c=0; c<brickColumnCount; c++) {
      for (let r=0; r<brickRowCount; r++) {
        if (!bricks[c][r].hit) {
          if (yHitBrick(bricks[c][r]) === "up") {
            ball.dy = -Math.abs(ball.dy);
            bricks[c][r].hit = true;
            score += 1;
          } else if (yHitBrick(bricks[c][r]) === "down") {
            ball.dy = Math.abs(ball.dy);
            bricks[c][r].hit = true;
            score += 1;
          }
          if (xHitBrick(bricks[c][r]) === "left") {
            ball.dx = -Math.abs(ball.dx);
            bricks[c][r].hit = true;
            score += 1;
          } else if (xHitBrick(bricks[c][r]) === "right") {
            ball.dx = Math.abs(ball.dx);
            bricks[c][r].hit = true;
            score += 1;
          }
        }
      }
    }
  }

  function xHitBrick(brick) {
    if (ball.y+ball.dy > brick.y && ball.y+ball.dy < brick.y+brickHeight) {
      if (ball.x+ball.dx > brick.x-ball.radius && ball.x+ball.dx < brick.x+brickWidth) {
        return "left";
      } else if (ball.x+ball.dx < brick.x+brickWidth+ball.radius && ball.x+ball.dx > brick.x) {
        return "right";
      }
    } else {
      return false;
    }
  }

  function yHitBrick(brick) {
    if (ball.x+ball.dx > brick.x && ball.x+ball.dx < brick.x+brickWidth) {
      if (ball.y+ball.dy > brick.y-ball.radius && ball.y+ball.dy < brick.y+brickHeight) {
        return "up";
      } else if (ball.y+ball.dy < brick.y+brickHeight+ball.radius && ball.y+ball.dy > brick.y) {
        return "down";
      }
    } else {
      return false;
    }
  }

  function draw() {
    if (start) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawLives();
      drawScore();
      // drawBricks();
      // collisionDetection();
      paddle1.drawPaddle(ctx, canvas);
      paddle2.drawPaddle(ctx, canvas);
      ball.drawBall(ctx, paddle1, canvas, interval);
      if (rightPressed && paddle1.x+paddle1.width < canvas.width) {
        paddle1.moveRight();
        client.send(JSON.stringify({ type: 'paddle', id: client_id, position: paddle1.x }));
      }
      if (leftPressed && paddle1.x > 0) {
        paddle1.moveLeft();
        client.send(JSON.stringify({ type: 'paddle', id: client_id, position: paddle1.x }));
      }
    }
  }
  
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  
  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
  }
  
  const interval = setInterval(draw, 10);
  
}