class Lightning{
       constructor(ctx) {
               this._ctx = ctx
               
               this._image = new Image
               this._image.src ="./img/lightning.png"

       }

       draw(){
           this._ctx.drawImage(this._image,500,-100,1000,1000)
       }
}