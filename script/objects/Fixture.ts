module AdventureRoo {
    export class Fixture extends Phaser.Sprite {
        constructor(game:Phaser.Game, x: number, y: number, spriteName: string, frameName: number) {
            super(game, x, y, spriteName, frameName);
            this.game = game;

            this.game.physics.arcade.enable(this);

            this.body.velocity.set(0);
            this.body.immovable = true;

            this.game.add.existing(this);
        }
    }
}
