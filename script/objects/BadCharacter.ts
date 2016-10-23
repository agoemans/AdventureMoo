module AdventureRoo {
    export class BadCharacter extends Phaser.Sprite {
        public game:Phaser.Game;
        public backgroundLayer:any;
        public flipped:boolean = true;
        public id:number = null;
        public mapLayer:any;
        public map:any;

        constructor( game: Phaser.Game, x: number, y: number, spriteName: string, frameName: number ) {
            super(game, x, y, spriteName, frameName);
            this.game = game;

            this.game.physics.arcade.enable(this);
            //this.scale.setTo(3, 3);
            this.body.velocity.set(0);
            this.body.gravity.y = 100;
        }

        public turnAround():void {
            //console.log(this.mapLayer.getTileLeft(0, this.position.x, this.position.y));
            //console.log('enemy turnaround', this.body.touching.right)
            if ( this.body.blocked.left ) {
                this.flipped = false;
            }

            if ( this.body.blocked.right ) {
                this.flipped = true;
            }
        }

        public setLayerInfo( map:any, mapLayer:any ):void {
            this.map = map;
            this.mapLayer = mapLayer;
        }

        public update():void {

            if ( !this.flipped ) {
                this.body.velocity.x = 150;
            } else {
                this.scale.set(-1, 1);
                this.body.velocity.x = -150;
            }

        }
    }
}
