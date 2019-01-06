window.onload = function() {
  const canvas = document.getElementById("gameBoard");
  const ctx = canvas.getContext("2d");

  const image = document.getElementById("source");
  console.log(image);
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
    // ctx.drawImage(image, 50, 50);
    drawBall();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
      dy = -dy;
    }
    x += dx;
    y += dy;
    // if (rightPressed) {
    //   x += dx;
    // }
    // if (leftPressed) {
    //   x -= dx;
    // }
    // if (upPressed) {
    //   y -= dy;
    // }
    // if (downPressed) {
    //   y += dy;
    // }
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


// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// //circle
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// //block
// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();