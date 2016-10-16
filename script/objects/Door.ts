module AdventureRoo {
    export class Door extends Phaser.Sprite {
        constructor(game:Phaser.Game, x: number, y: number) {
            super(game, x, y, 'Fixtures', 0);
            this.game = game;

            this.game.physics.arcade.enable(this);
            this.body.velocity.set(0);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 100;
            this.body.immovable = true;

            this.game.add.existing(this);
        }

        public update():void {
        }

        public isOpened():void {
            this.visible = false;
            this.body.enable = false;
        }
    }
}