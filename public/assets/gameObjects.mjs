export class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.dx = 2;
    this.dy = 2;
    this.radius = radius;
  }

  drawBall(ctx, paddleX, paddleWidth, paddleHeight, canvas) {
    if (this.xHitWall(canvas)) {
      this.dx = -this.dx;
    }
    if (this.yHitWall(canvas) || this.yHitPaddle(paddleX, paddleWidth, paddleHeight, canvas)) {
      this.dy = -this.dy;
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
    return this.x + this.dx > canvas.width-this.radius || this.x+this.dx < this.radius;
  }

  yHitWall(canvas) {
    return this.y + this.dy > canvas.height-this.radius || this.y+this.dy < this.radius;
  }

  yHitPaddle(paddleX, paddleWidth, paddleHeight, canvas) {
    return (this.x >= paddleX && this.x <= paddleX+paddleWidth) && this.y + this.dy > canvas.height-paddleHeight-10-this.radius;
  }
}

export class Player {
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
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();    
  }

  moveRight() {
    this.x += 3;
  }

  moveLeft() {
    this.x -= 3;

  }
}