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
        }

        public turnAround(): void{
            this.flipped = !this.flipped;
        }

        public update():void {

            if(this.x < 50) {
                this.flipped = false;
            }

            if(this.x > this.game.width * 0.9) {
                this.flipped = true;
            }
            if (!this.flipped) {
                this.body.velocity.x = 150;
            } else {
                this.scale.set(-1, 1);
                this.body.velocity.x = -150;
            }

        }
    }
}
