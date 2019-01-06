export class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.dx = 2;
    this.dy = 2;
    this.radius = radius;
  }

  drawBall(ctx, canvas) {
    if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy > canvas.height - this.radius || this.y + this.dy < this.radius) {
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