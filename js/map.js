class Map{
   
        constructor(ctx,image, w, h) {
            this.ctx = ctx
            this.width = w
            this.height = h

            this.image = new Image()
            this.image.src = `img/${image}`

            this.posX = 0
            this.posY = 0
        }
        draw() {

            //Dibujamos dos fondos uno al lado de otro para formar una "cinta" que se moverá junta
            this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
           
        }
}