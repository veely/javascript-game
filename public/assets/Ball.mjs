export class Ball {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.dx = speed;
    this.dy = speed;
    this.radius = radius;
  }

  drawBall(ctx, paddle, canvas, interval) {
    if (this.xHitWall(canvas)) {
      this.dx = -this.dx;
    }

    //make this more readable
    if (this.yHitWall(canvas) || (this.dy > 0 && this.yHitPaddle(paddle.x, paddle.width, paddle.height, canvas))) {
      this.dy = -this.dy;
    } else if (this.yHitBottom(canvas)) {

      this.dy = -this.dy; //DELETE THIS AFTER MULTIPLAYER WORKS

      // paddle.lives -= 1;
      // if (paddle.lives) {
      //   paddle.x = (canvas.width - paddle.width) / 2;
      //   this.x = canvas.width/2;
      //   this.y = canvas.height - 23;
      // } else {
      //   alert("Game Over!");
      //   document.location.reload();
      //   clearInterval(interval);
      // }
    }

    //make this more readable
    if (this.dy > 0) {
      if (this.xHitPaddle(paddle.x, paddle.width, paddle.height, canvas) === "left") {
        this.dx = -Math.abs(this.dx);
        this.dy = -this.dy;
      } else if (this.xHitPaddle(paddle.x, paddle.width, paddle.height, canvas) === "right") {
        this.dx = Math.abs(this.dx);
        this.dy = -this.dy;
      }
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = "#ff6666";
    ctx.fill();
    ctx.closePath();
    this.x += this.dx;
    this.y += this.dy;
  }

  xHitWall(canvas) {
    return this.x+this.dx > canvas.width-this.radius || this.x+this.dx < this.radius;
  }

  yHitWall(canvas) {
    return this.y+this.dy < this.radius;
  }

  yHitBottom(canvas) {
    return this.y+this.dy > canvas.height-this.radius;
  }

  yHitPaddle(paddleX, paddleWidth, paddleHeight, canvas) {
    return (this.x+this.dx > paddleX && this.x+this.dx < paddleX+paddleWidth) && this.y+this.dy > canvas.height-paddleHeight-10-this.radius;
  }

  xHitPaddle(paddleX, paddleWidth, paddleHeight, canvas) {
    if (this.y+this.dy > canvas.height-paddleHeight-10 && this.y+this.dy < canvas.height-10) {
      if (this.x+this.dx > paddleX-this.radius && this.x+this.dx < paddleX+paddleWidth) {
        return "left";
      } else if (this.x+this.dx < paddleX+paddleWidth+this.radius && this.x+this.dx > paddleX) {
        return "right";
      }
    } else {
      return false;
    }
  }
}