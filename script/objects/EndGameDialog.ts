module AdventureRoo {
    export class EndGameDialog extends Phaser.Group {
        public game:Phaser.Game;
        private levelEndText: string;
        private buttonText: string;
        private buttonName: string;

        constructor( game:Phaser.Game, levelFail:boolean ) {
            super(game, null, 'EndGameDialog');
            this.game = game;

            let bg = new Phaser.Graphics(this.game, 10, 10);
            bg.beginFill(0x948c75);
            bg.drawRoundedRect(0, 0, 400, 400, 20);
            bg.endFill();
            this.add(bg);

            this.setLevelNumber(levelFail);
            this.setLevelEndText(levelFail);

            let levelEndTextStyle: any = { font: "65px Arial", fill: "#547980", align: "center" };
            let levelEndText: Phaser.Text = new Phaser.Text(this.game, bg.width / 2, 170, this.levelEndText, levelEndTextStyle);
            levelEndText.anchor.set(0.5);
            this.add(levelEndText);

            let button:Phaser.Button = new Phaser.Button(this.game, 0, 0, this.buttonName, ():void => {
                //Go to Game state
                this.game.state.start('GamePlay');
                this.destroy();
            });

            button.anchor.set(0.5, 0.5);
            button.scale.set(0.8);
            this.add(button);

            button.alignIn(bg, Phaser.BOTTOM_CENTER, null, -30);

        }

        public setLevelNumber( levelFail:boolean ):void {
            if ( !levelFail ) {
                if ( Global.Level == 1 ) {
                    Global.Level++;
                }
            }
        }

        public setLevelEndText( levelFail:boolean ):void {
            if ( levelFail ) {
                this.levelEndText = 'You \n Died!';
                this.buttonText = 'Try Again';
                this.buttonName = 'TryAgainButton';
            } else {
                this.levelEndText = 'You \n made it!';
                this.buttonText = 'Next Level?';
                this.buttonName = 'NextButton';
            }
        }
    }
}
