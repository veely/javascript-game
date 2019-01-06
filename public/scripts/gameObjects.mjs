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