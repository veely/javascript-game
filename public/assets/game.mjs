import { Ball } from './Ball.mjs';
import { Player } from './Player.mjs';

window.onload = function() {
  const canvas = document.getElementById("gameBoard");
  const ctx = canvas.getContext("2d");
  
  let rightPressed = false;
  let leftPressed = false;
  // let upPressed = false;
  // let downPressed = false;
  
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

  var ball = new Ball(canvas.width/2, canvas.height - 23, ballRadius, ballSpeed);
  var player = new Player(lives, paddleSpeed, canvas);

  var bricks = [];
  for (let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for (let r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, hit: false };
    }
  }

  function drawBricks(ball) {
    for (let c=0; c<brickColumnCount; c++) {
      for (let r=0; r<brickRowCount; r++) {
        if (!bricks[c][r].hit) {
          let brickX = c*(brickWidth+brickPadding)+brickOffsetLeft;
          let brickY = r*(brickHeight+brickPadding)+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
          if ((ball.x+ball.dx > brickX && ball.x+ball.dx < brickX+brickWidth) && (ball.y+ball.dy > brickY && ball.y+ball.dy < brickY+brickHeight)) {
            bricks[c][r].hit = true;
            ball.dy = -ball.dy;
          }
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks(ball);
    player.drawPaddle(ctx, canvas);
    ball.drawBall(ctx, player.x, player.width, player.height, canvas);
    if (rightPressed && player.x+player.width < canvas.width) {
      player.moveRight();
    }
    if (leftPressed && player.x > 0) {
      player.moveLeft();
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
    // if (e.key == "Up" || e.key == "ArrowUp") {
    //   upPressed = true;
    // } else if (e.key == "Down" || e.key == "ArrowDown") {
    //   downPressed = true;
    // }
  }
  
  function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
    // if (e.key == "Up" || e.key == "ArrowUp") {
    //   upPressed = false;
    // } else if (e.key == "Down" || e.key == "ArrowDown") {
    //   downPressed = false;
    // }
  }
  
  setInterval(draw, 10);
}