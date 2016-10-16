module AdventureRoo {
    export class EndGameDialog extends Phaser.Group {
        public game: Phaser.Game;
        constructor(game:Phaser.Game, x: number, y: number) {
            super(game, null, 'EndGameDialog');
            this.game = game;

            var bg = new Phaser.Graphics(this.game, 10, 10);
            bg.beginFill(0x292929);
            bg.drawRoundedRect(10, 10, 400, 400, 20);
            bg.endFill();
            this.add(bg);

            let button: Phaser.Button = new Phaser.Button(this.game, bg.width / 2 , bg.height - 100, 'Button', (): void => {
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
