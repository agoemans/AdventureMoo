module AdventureRoo {
    export class Key extends Fixture {
        constructor(game:Phaser.Game, x: number, y: number, spriteName: string, frameName: number) {
            super(game, x, y, spriteName, frameName)
        }

        public isPickedUp():void {
            this.visible = false;
            this.body.enable = false;
        }
    }
}
