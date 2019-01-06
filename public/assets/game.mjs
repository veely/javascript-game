import { Ball, Player } from './gameObjects.mjs';

window.onload = function() {
  const canvas = document.getElementById("gameBoard");
  const ctx = canvas.getContext("2d");
  
  let rightPressed = false;
  let leftPressed = false;
  // let upPressed = false;
  // let downPressed = false;
  
  var ball1 = new Ball(50, 50, 10);
  var player = new Player(2, 3, canvas);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.drawPaddle(ctx, canvas);
    ball1.drawBall(ctx, player.x, player.width, player.height, canvas);
    if (rightPressed) {
      player.moveRight();
    }
    if (leftPressed) {
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
    if (e.key == "Up" || e.key == "ArrowUp") {
      upPressed = true;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
      downPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
    if (e.key == "Up" || e.key == "ArrowUp") {
      upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
      downPressed = false;
    }
  }
  
  setInterval(draw, 10);
}