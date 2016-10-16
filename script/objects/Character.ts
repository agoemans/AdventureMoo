module AdventureRoo {
    export class Character extends Phaser.Sprite {
        public isDead: boolean = false;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'MainCharacter', 0);
            this.game = game;

            this.game.physics.arcade.enable(this);
            this.body.velocity.set(0);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 100;

        }

        public preload():void {
        }

        public update():void {
            if(this.isDead){
                return;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.body.velocity.x = 0;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.body.onFloor()) {
                this.body.velocity.y = -250;
            }
        }

        public collisionHandler():void {
            this.frame = 7;
            //this.visible = false;
            //this.body.velocity.set(0);
            this.isDead = true;
        }
    }
}
