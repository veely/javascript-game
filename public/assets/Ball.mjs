export class Ball {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.dx = speed;
    this.dy = speed;
    this.radius = radius;
  }

  drawBall(ctx, paddleX, paddleWidth, paddleHeight, canvas) {
    if (this.xHitWall(canvas)) {
      this.dx = -this.dx;
    }

    //make this more readable
    if (this.yHitWall(canvas) || (this.dy > 0 && this.yHitPaddle(paddleX, paddleWidth, paddleHeight, canvas))) {
      this.dy = -this.dy;
    }

    //make this more readable
    if (this.dy > 0) {
      if (this.xHitPaddle(paddleX, paddleWidth, paddleHeight, canvas) === "left") {
        this.dx = -Math.abs(this.dx);
        this.dy = -Math.abs(this.dy);
      } else if (this.xHitPaddle(paddleX, paddleWidth, paddleHeight, canvas) === "right") {
        this.dx = Math.abs(this.dx);
        this.dy = -Math.abs(this.dy);
      }
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    this.x += this.dx;
    this.y += this.dy;
  }

  xHitWall(canvas) {
    return this.x+this.dx > canvas.width-this.radius || this.x+this.dx < this.radius;
  }

  yHitWall(canvas) {
    return this.y+this.dy > canvas.height-this.radius || this.y+this.dy < this.radius;
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