class Hero {
    constructor(ctx, image, width, height, heroW, heroH, maxLife, attack, defense, attackSpeed, keys) {
        this._ctx = ctx;
        this._width = width;
        this._height = height;
        this._heroW = heroW;
        this._heroH = heroH;


        this._maxLife = maxLife;
        this._lifeRecive = undefined;
        this._currentLife = maxLife;
        this._attack = attack;
        this._defense = defense;
        this._attackSpeed = attackSpeed;
        this._mana = 10;
        this._maxMana = 50;

        this._image = new Image();
        this._image.src = `./img/${image}`;
        this._posX = 25;
        this._posY = this._height - 80;
        this._posXB = 225
        this._posYB = 375
        this._posXB0 = 225
        this._posYB0 = 375
        this._battleW = 250
        this._battleH = 400
        this._image.framesX = 12;
        this._image.framesY = 8;
        this._framesIndexX = 3;
        this._framesIndexY = 0;
        this._keys = keys;
        this._vel = 6
        this.setListeners();
    }
    //dibuja la posicion del heroe en el campo de batalla
    draw() {

        let cutXS = this._framesIndexX * Math.floor(this._image.width / this._image.framesX);
        let cutXF = Math.floor(this._image.width / this._image.framesX);
        let cutYS = this._framesIndexY * Math.floor(this._image.height / this._image.framesY);
        let cutYF = Math.floor(this._image.height / this._image.framesY);

        this._ctx.drawImage(
            this._image,
            cutXS, cutYS, cutXF, cutYF,
            this._posX,
            this._posY,
            this._heroW, this._heroH
        );

    }
    //dibuja la posicion del heroe en el campo de batalla
    drawB() {

        let cutXS = 4 * Math.floor(this._image.width / this._image.framesX);
        let cutXF = Math.floor(this._image.width / this._image.framesX);
        let cutYS = 3 * Math.floor(this._image.height / this._image.framesY);
        let cutYF = Math.floor(this._image.height / this._image.framesY);
        this._ctx.drawImage(
            this._image,
            cutXS, cutYS, cutXF, cutYF,
            this._posXB,
            this._posYB,
            this._battleW, this._battleH
        );

    }
    //set listener para controlar al heroe con las flechas 
    setListeners() {
        document.onkeydown = e => {
            if (game.framesCounter % 1000) {
                switch (e.keyCode) {
                    case this._keys.DOWN:
                        this._framesIndexY = 0;

                        this._framesIndexX++;

                        this._framesIndexX > 5 ? this._framesIndexX = 3 : null
                        this._posY < this._height - this._heroH && !game.isCollision(0, this._vel) ? this.goDown() : null
                        break;

                    case this._keys.LEFT:
                        this._framesIndexY = 1;
                        this._framesIndexX++;
                        this._framesIndexX > 5 ? this._framesIndexX = 3 : null

                        this._posX > 0 && !game.isCollision(this._vel * -1, 0) ? this.goLeft() : null
                        break;

                    case this._keys.RIGTH:
                        this._framesIndexY = 2;
                        this._framesIndexX++;
                        this._framesIndexX > 5 ? this._framesIndexX = 3 : null
                        this._posX < this._width - this._heroW && !game.isCollision(this._vel, 0) ? this.goRigth() : null
                        break;

                    case this._keys.UP:
                        this._framesIndexY = 3;
                        this._framesIndexX++;
                        console.log(!game.isCollision(0, this._vel * -1))
                        this._framesIndexX > 5 ? this._framesIndexX = 3 : null
                        this._posY > 0 && !game.isCollision(0, this._vel * -1) ? this.goUp() : null
                        break;
                }
            }
        }
    }
    goLeft() {
        this._posX -= this._vel;
    }
    goRigth() {
        this._posX += this._vel;
    }
    goUp() {
        this._posY -= this._vel;
    }
    goDown() {
        this._posY += this._vel;
    }

    damageRecived(enemyAttack) {
        this._currentLife -= enemyAttack - this._defense;
        return this._currentLife
    }
    heal() {
        this._currentLife += 100

    }

}