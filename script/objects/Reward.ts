module AdventureRoo {
    export class Reward extends Phaser.Sprite {

        constructor(game:Phaser.Game, x: number, y: number) {
            super(game, x, y, 'Rewards', 1);
            this.game = game;

            this.game.physics.arcade.enable(this);

            this.body.velocity.set(0);
            this.body.immovable = true;

            this.game.add.existing(this);
        }

        public update():void {
        }

        public isPickedUp():void {
            this.visible = false;
            this.body.enable = false;
        }
    }
}
