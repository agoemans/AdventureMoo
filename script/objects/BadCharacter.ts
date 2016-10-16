module AdventureRoo {
    export class BadCharacter extends Phaser.Sprite {
        public game:Phaser.Game;
        public backgroundLayer: any;
        public flipped:boolean = true;

        constructor(game:Phaser.Game, x:number, y:number, spriteName:string, backgroundLayer: any) {
            super(game, x, y, spriteName, 2);
            this.game = game;

            this.game.physics.arcade.enable(this);
            this.body.velocity.set(0);
            this.body.gravity.y = 100;
            this.backgroundLayer = backgroundLayer;
        }

        public update():void {
            this.game.physics.arcade.collide(this, this.backgroundLayer);

            if(this.x < 50) {
                this.flipped = false;
            }

            if(this.x > this.game.width * 0.9) {
                this.flipped = true;
            }
            if (!this.flipped) {
                this.body.velocity.x = 150;
            } else {
                this.body.velocity.x = -150;
            }

        }
    }
}
