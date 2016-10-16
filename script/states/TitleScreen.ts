module AdventureRoo {
    export class TitleScreen extends Phaser.State {
        constructor() {
            super();
        }

        public init():void {
            this.game.stage.backgroundColor = '#ffffff';

            let button: Phaser.Button = new Phaser.Button(this.game, 650 / 2, 400 - 50, 'Button', (): void => {
                //Go to Game state
                this.game.state.start('GamePlay');
            });
            button.anchor.set(0.5);
            this.game.add.existing(button);

        }

        public preload():void {
        }

    }
}
