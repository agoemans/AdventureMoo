/// <reference path ="Fixture.ts"/>
module AdventureRoo {
    export class Door extends Fixture {
        constructor( game:Phaser.Game, x:number, y:number, spriteName:string, frameName:number ) {
            super(game, x, y, spriteName, frameName)

        }

        public isOpened():void {
            this.visible = false;
        }

        public disableForCollision():void {
            this.body.immovable = false;
            this.body.enable = false;
        }
    }
}
