module AdventureRoo {
    export class EndGameDialog extends Phaser.Group {
        public game: Phaser.Game;
        constructor(game:Phaser.Game, x: number, y: number) {
            super(game, null, 'EndGameDialog');
            this.game = game;

            var bg = new Phaser.Graphics(this.game, x, y);
            bg.beginFill(0x292929);
            bg.drawRoundedRect(x, y, 100, 100, 20);
            bg.endFill();
            this.add(bg);

            let button: Phaser.Button = new Phaser.Button(this.game, x, y, 'Button', (): void => {
                if(Global.Level == 1){
                    Global.Level++;
                }
                //Go to Game state
                this.game.state.start('GamePlay');
                this.destroy();
            });
            button.anchor.set(0.5);
            button.scale.set(0.8);
            this.add(button);
        }

        public removeGroup():void {

        }
    }
}
