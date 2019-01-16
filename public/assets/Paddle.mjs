export class Paddle {
  constructor(lives, speed, canvas, y, height, width) {
    this.lives = lives;
    this.speed = speed;
    this.height = height;
    this.width = width;
    this.x = (canvas.width - this.width) / 2;
    this.y = y;
  }

  drawPaddle(ctx, canvas) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
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