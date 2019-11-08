const Status = {
  ctx: undefined,
  init(ctx) {
    this.ctx = ctx
    this.ctx.font = "50px sans-serif"
  },
  update(status, color, posY, posX) {
    this.ctx.fillStyle = color
    this.ctx.fillText(Math.floor(status), posX, posY);

  }

}