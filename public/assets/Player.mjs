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