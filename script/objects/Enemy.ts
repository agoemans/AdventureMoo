module AdventureRoo {
    export class Enemy extends Phaser.Sprite {
        public game:Phaser.Game;
        public backgroundLayer:any;
        public flipped:boolean = true;
        public id:number = null;
        public mapLayer:any;
        public map:any;
        public velocityX; number;

        constructor( game: Phaser.Game, x: number, y: number, spriteName: string, frameName: number ) {
            super(game, x, y, spriteName, frameName);
            this.game = game;

            this.game.physics.arcade.enable(this);
            this.body.velocity.set(0);
            this.body.gravity.y = 100;
            this.velocityX = Math.random() * (Global.EnemyVelocityXMax - Global.EnemyVelocityXMin)
                + Global.EnemyVelocityXMin;
        }

        public turnAround():void {
            if ( this.body.blocked.left ) {
                this.flipped = false;
            }

            if ( this.body.blocked.right ) {
                this.flipped = true;
            }
        }

        public update():void {
            if ( !this.flipped ) {
                this.body.velocity.x = this.velocityX;
            } else {
                this.scale.set(-1, 1);
                this.body.velocity.x = -this.velocityX;
            }

        }
    }
}
