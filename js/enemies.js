class Enemies {
    constructor(vel,xCut,yCut,battleW,battleH,name,ctx, image, framesX, framesY, framesIdexX, framesIndexY, width, height, enemyW, enemyH, posX, posY,movimiento, maxLife, attack, defense, attackSpeed) {
        this._ctx = ctx;
        this._width = width;
        this._height = height;
        this._enemyW = enemyW;
        this._enemyH = enemyH;

        this._posX = posX;
        this._posX0 = posX;
        this._posY = posY;
        this._posY0 = posY;
        this._posXB= 830
        this._posYB=50
        this._posXB0 = 830
        this._posYB0 = 50
        this._battleW = battleW
        this._battleH = battleH
        this._image = new Image();
        this._image.src = `./img/${image}`;
        this._name=name;
        this._image.framesX = framesX;
        this._image.framesY = framesY;
        this._framesIndexX = framesIdexX;
        this._framesIndexX0 = framesIdexX;
        this._framesIndexY = framesIndexY;
        this._framesIndexY0 = framesIndexY;
        this._vel = vel;
        this._movimiento=movimiento
        this._direction = true;
        this._xCut=xCut
        this._yCut=yCut

        this._maxLife = maxLife;
        this._lifeRecive = undefined;
        this._currentLife = maxLife;
        this._attack = attack;
        this._defense = defense;
        this._attackSpeed = attackSpeed;
        this._attackSpeed0 = attackSpeed
       
    }
    draw() {

        let cutXS = this._framesIndexX * Math.floor(this._image.width / this._image.framesX);
        let cutXF = Math.floor(this._image.width / this._image.framesX);
        let cutYS = this._framesIndexY * Math.floor(this._image.height / this._image.framesY);
        let cutYF = Math.floor(this._image.height / this._image.framesY);
        //console.log(cutXS, cutXF, cutYS, cutYF, this._heroW, this._heroH)
        this._ctx.drawImage(
            this._image,
            cutXS, cutYS, cutXF, cutYF,

            this._posX,
            this._posY,
            this._enemyW, this._enemyH
        );
    }
    drawB() {

        let cutXS = this._xCut * Math.floor(this._image.width / this._image.framesX);
        let cutXF = Math.floor(this._image.width / this._image.framesX);
        let cutYS = this._yCut * Math.floor(this._image.height / this._image.framesY);
        let cutYF = Math.floor(this._image.height / this._image.framesY);
        //console.log(cutXS, cutXF, cutYS, cutYF, this._heroW, this._heroH)
        this._ctx.drawImage(
            this._image,
            cutXS, cutYS, cutXF, cutYF,

            this._posXB,
            this._posYB,
            this._battleW, this._battleH
        );
    }
   
    
    verticalMove(framesCounter) {
        if (framesCounter % 10 == 0) {
            
            let direccion = true;

            
            this._framesIndexY = 0;
            if (this._posY < this._posY0 + this._vel * this._movimiento && this._direction) {
                this._framesIndexX++;
                this._posY += this._vel;
                if (this._framesIndexX > this._framesIndexX0 + 2) this._framesIndexX = this._framesIndexX0;
                if (this._posY >= this._posY0 + this._vel* this._movimiento) this._direction = false
            }else {
                

                this._framesIndexY = 3
                 this._framesIndexX++;
                this._posY -= this._vel
                if (this._framesIndexX > this._framesIndexX0 + 2) this._framesIndexX = this._framesIndexX0;
                if(this._posY<=this._posY0)this._direction=true
            }

        }
    }



    damageRecived(heroAttack) {
        this._currentLife -= heroAttack - this._defense;
        
        return this._currentLife
    }
}