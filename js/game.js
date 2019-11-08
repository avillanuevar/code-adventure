const game = {
    title: 'Code Adventure',
    author: 'Alfonso Villanueva',
    license: undefined,
    version: '1.0',
    canvasDom: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    backpack: [],
    experience: undefined,
    hero: undefined,
    statusHP: undefined,
    statusMana: undefined,
    statusEnemy: undefined,
    enemies: [],
    foundenemy: undefined,
    battlaBackground: undefined,
    battleB: false,
    characterW: 35,
    characterH: 45,
    map: undefined,
    obstacles: undefined,
    lightning: undefined,
    maps: ["mapa1.png"],
    interval: undefined,
    fps: 60,
    walkingMusic: new Audio("./music/move.mp3"),
    attackMusic: new Audio("./music/fight.mp3"),
    backMusic: new Audio("./music/intro.mp3"),
    keys: {
        LEFT: 37,
        UP: 38,
        RIGTH: 39,
        DOWN: 40,
        BACK: 83,
        ATTACK: 65,
        HEAL: 68

    },
    colmap1: [{
            posX: 0,
            posY: 550,
            colHeight: 1,
            colWidth: 806
        },
        {
            posX: 826,
            posY: 473,
            colHeight: 74,
            colWidth: 2
        },
        {
            posX: 826,
            posY: 473,
            colHeight: 1,
            colWidth: 257
        },
        {
            posX: 1061,
            posY: 420,
            colHeight: 50,
            colWidth: 60
        },
        {
            posX: 1021,
            posY: 560,
            colHeight: window.innerHeight * 0.98 - 560,
            colWidth: window.innerWidth * 0.98 - 753
        },
        {
            posX: 0,
            posY: 305,
            colHeight: 2,
            colWidth: 500
        },
        {
            posX: 520,
            posY: 0,
            colHeight: 335,
            colWidth: 54
        },
        {
            posX: 0,
            posY: 0,
            colHeight: 113,
            colWidth: window.innerWidth * 0.98
        },
        {
            posX: 780,
            posY: 0,
            colHeight: 335,
            colWidth: 96
        },
        {
            posX: 821,
            posY: 0,
            colHeight: 305,
            colWidth: window.innerWidth * 0.98 - 661
        },
        {
            posX: 861,
            posY: 305,
            colHeight: 84,
            colWidth: 2
        },
        {
            posX: 747,
            posY: 389,
            colHeight: 2,
            colWidth: 114
        },
        {
            posX: 727,
            posY: 389,
            colHeight: 60,
            colWidth: 0.5
        },
        {
            posX: 120,
            posY: 447,
            colHeight: 1,
            colWidth: 568
        },
        {
            posX: 120,
            posY: 389,
            colHeight: 54,
            colWidth: 1
        },

    ],
    framesCounter: 0,
    init() {
        this.canvasDom = document.getElementById("myCanvas");
        this.ctx = this.canvasDom.getContext("2d");
        this.width = window.innerWidth * 0.98;
        this.height = window.innerHeight * 0.98;
        this.canvasDom.width = this.width;
        this.canvasDom.height = this.height;
        this.start();
        // this.reset()
        //this.drawAll()
    },

    start() {
        this.reset();
        this.interval = setInterval(() => {
            this.framesCounter++
            if (this.framesCounter > 2000) this.framesCounter = 0;
            if (this.foundenemy) {

                this.battle()
            }
            if (!this.battleB) {
                this.stopMusicB()
                this.playLoop()
                this.clear();
                this.drawAll();
                this.moveAll();
                this.isCollisionEnemy();
            } else {
                this.stopMusic()
                this.playLoopB()
                this.clear();
                this.drawBattle()
            }



        }, 1000 / this.fps);
    },
    reset() {
        this.hero = new Hero(this.ctx, `special-armor.png`, this.canvasDom.width, this.canvasDom.height, this.characterW, this.characterH, 500, 120, 20, 3, this.keys);
        this.map = new Map(this.ctx, this.maps[0], this.canvasDom.width, this.canvasDom.height);
        this.statusHP = Status;
        this.statusHP.init(this.ctx);
        this.statusMana = Status;
        this.statusMana.init(this.ctx);
        this.lightning = new Lightning(this.ctx)
        this.enemies.push(new Enemies(7,7,0,225, 325,"chickgon", this.ctx, `chickgon.png`, 12, 8, 7, 0, this.canvasDom.width, this.canvasDom.height, this.characterW, this.characterH, 1160, 340, 22, 150, 40, 20, 3, 1))
        this.enemies.push(new Enemies(7,7,0,225, 325,"wereWolf", this.ctx, `werewolf.png`, 12, 8, 6, 0, this.canvasDom.width, this.canvasDom.height, this.characterW, this.characterH, 511, 560, 8, 200, 30, 20, 2))
        this.enemies.push(new Enemies(7,7,0,225, 325,"slug", this.ctx, `slime.png`, 12, 8, 6, 0, this.canvasDom.width, this.canvasDom.height, this.characterW, this.characterH, 763, 407, 12, 150, 35, 30, 3))
        this.enemies.push(new Enemies(7,7,0,225, 325,"pigy", this.ctx, `bearent.png`, 12, 8, 6, 0, this.canvasDom.width, this.canvasDom.height, this.characterW, this.characterH, 301, 449, 8, 300, 30, 20, 2))
        this.enemies.push(new Enemies(7,7,0,225, 325,"specter", this.ctx, `specter.png`, 12, 8, 6, 0, this.canvasDom.width, this.canvasDom.height, this.characterW, this.characterH, 43, 317, 26, 400, 50, 20, 2))
        this.enemies.push(new Enemies(7,7,0,225, 325,"rock", this.ctx, `elemental2.png`, 12, 8, 6, 0, this.canvasDom.width, this.canvasDom.height, this.characterW, this.characterH, 331, 317, 12, 400, 50, 20, 2))
        this.enemies.push(new Enemies(2,1,0,300, 325,"boss", this.ctx, `reinbow-dragon.png`, 3, 4, 0, 0, this.canvasDom.width, this.canvasDom.height, 150, 200, 600, 115, 16, 200, 50, 20, 0.75))
        // this.enemies.push(new Enemies("wereWolf", this.ctx, `werewolf.png`, 12, 8, 6, 0, this.canvasDom.width, this.canvasDom.height, this.characterW, this.characterH, 511, 560, 8, 200, 50, 20, 2))
        this.GameOver = new Map(this.ctx, "gameOver.jpg", this.canvasDom.width, this.canvasDom.height)
    },
    drawAll() {
        this.map.draw();
        this.hero.draw();
        this.enemies.forEach(elm => {
            elm.draw()
        })
        this.drawHStatus()



    },
    drawBattle() {
        this.battlaBackground.draw();
        this.foundenemy.drawB();
        this.hero.drawB();
        this.drawHStatus();
        this.drawEStatus();
        this.battle();

    },
    moveAll() {
        this.enemies.forEach(elm => {
            elm.verticalMove(this.framesCounter);
        })
    },
    isCollision(newPosX, newPosY) {
        let posX = this.hero._posX + newPosX;
        let posY = this.hero._posY + newPosY;

        return this.colmap1.some(
            col =>
            posX + this.hero._heroW >= col.posX &&
            posY + this.hero._heroH >= col.posY &&
            posX <= col.posX + col.colWidth &&
            posY <= col.posY + col.colHeight

        );
    },
    isCollisionEnemy() {
        this.foundenemy = this.enemies.find(
            (enemy, index) => {

                return (
                    this.hero._posX + this.hero._heroW >= enemy._posX &&
                    this.hero._posY + this.hero._heroH >= enemy._posY &&
                    this.hero._posX <= enemy._posX + enemy._enemyW &&
                    this.hero._posY <= enemy._posY + enemy._enemyH)
                //console.log(enemy)

            })


    },
    playLoop() {
        this.walkingMusic.volume = 0.3
        this.walkingMusic.loop = true
        this.walkingMusic.play()
    },

    stopMusic() {
        this.walkingMusic.pause()
        this.walkingMusic.currentTime = 0
    },
    playLoopB() {
        this.attackMusic.volume = 0.3
        this.attackMusic.loop = true
        this.attackMusic.play()
    },

    stopMusicB() {
        this.attackMusic.pause()
        this.attackMusic.currentTime = 0
    },
    clear() {
        this.ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
    },
    battle() {
        this.battlaBackground = new Map(this.ctx, "fondobatalla.png", this.canvasDom.width, this.canvasDom.height)
        this.statusEnemy = Status;
        this.statusEnemy.init(this.ctx)

        this.battleB = true
        let count = 0
        if (this.framesCounter % 100 == 0) {
            count++
             this.hero._posYB = this.hero._posYB0
             this.hero._posXB = this.hero._posXB0
            this.foundenemy._attackSpeed += this.foundenemy._attackSpeed;

            console.log(this.foundenemy._attackSpeed)
           
            if (this.foundenemy._attackSpeed > 10) {
                this.foundenemy._attackSpeed = this.foundenemy._attackSpeed0;

                this.foundenemy._posYB = this.foundenemy._posYB0
                this.foundenemy._posXB = this.foundenemy._posXB0


                this.hero.damageRecived(this.foundenemy._attack);
                console.log("my life:" + this.hero.damageRecived(this.foundenemy._attack));
            } else {
                this.foundenemy._posXB -= 500
                this.foundenemy._posYB += 300
            }

            console.log("mana" + this.hero._mana)
            console.log(this.foundenemy._currentLife)
            if (this.hero._mana <= this.hero._maxMana) this.hero._mana += this.hero._attackSpeed;

            console.log(this.hero._mana)


            this.setListeners()


        }
        if (this.foundenemy._currentLife <= 0) {
            this.enemies.forEach((elm, index) => {
                if (elm._name == this.foundenemy._name) {
                    this.enemies.splice(index, 1)
                }
                 this.hero._posYB = this.hero._posYB0
                 this.hero._posXB = this.hero._posXB0
            })
            this.battleB = false
        }
        if (this.hero._currentLife <= 0) {
            this.gameOver()

        }




    },
    setListeners() {

        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.ATTACK:
                    if (this.hero._mana > 10) {
                        this.hero._posXB += 500
                        this.hero._posYB -= 300
                        this.foundenemy.damageRecived(this.hero._attack);
                        this.hero._mana -= 10
                    }
                    break;
                case this.keys.HEAL:
                    if (this.hero._mana > 10) {
                        if (this.hero._currentLife <= this.hero._maxLife) {
                            this.hero.heal();
                            this.hero._mana -= 10
                            if (this.hero._currentLife >= this.hero._maxLife) {
                                his.hero._currentLife = this.hero._maxLife
                            }
                        }
                    }
                    break;


            }
        })


    },
    drawHStatus() {
        this.statusHP.update(this.hero._currentLife, "red", 60, 60);
        this.statusMana.update(this.hero._mana, "blue", 100, 60);
    },
    drawEStatus() {
        this.statusEnemy.update(this.foundenemy._currentLife, "red", 450, 1200);

    },
    gameOver() {

        this.GameOver.draw()
        clearInterval(this.interval)
        clearInterval(this.interval)
       
        this.stopMusicB()
        gameOverMusic = document.createElement("audio")
        gameOverMusic.src = "./music/intro.mp3"
        gameOverMusic.volume = 0.2
        gameOverMusic.play()
    },



}