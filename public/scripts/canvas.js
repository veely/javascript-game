window.onload = function() {
  const canvas = document.getElementById("gameBoard");
  const ctx = canvas.getContext("2d");
  
  let x = 50;
  let y = 50;
  let dx = 2;
  let dy = 2;
  let ballRadius = 10;
  
  let rightPressed = false;
  let leftPressed = false;
  let upPressed = false;
  let downPressed = false;
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
      dy = -dy;
    }
    x += dx;
    y += dy;
  }
  
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
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