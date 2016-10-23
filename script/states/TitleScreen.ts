module AdventureRoo {
    export class TitleScreen extends Phaser.State {
        constructor() {
            super();
        }

        public init():void {
            this.game.stage.backgroundColor = '#ffffff';

            let levelEndTextStyle: any = { font: "45px Arial", fill: "#547980", align: "center" };
            let levelEndTextValue: string = 'A fun little adventure game! \n' +
                'Collect the drinks, get to the exit!';
            let levelEndText: Phaser.Text = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 3, levelEndTextValue, levelEndTextStyle);
            levelEndText.anchor.set(0.5);
            this.game.add.existing(levelEndText);

            let character: Phaser.Sprite = new Phaser.Sprite(this.game, this.game.width / 3 + 50, this.game.height / 2, 'MainCharacter', 0);
            this.game.add.existing(character);

            for (let i: number = 0 ; i < 2; i++){
                let drink: Phaser.Sprite = new Phaser.Sprite(this.game, this.game.width / 2 + (i * 50) , this.game.height / 2, 'Drink', i);
                this.game.add.existing(drink);
            }

            let button: Phaser.Button = new Phaser.Button(this.game, this.game.width / 2, this.game.height - 100, 'StartButton', (): void => {
                //Go to Game state
                this.game.state.start('GamePlay');
            });
            button.anchor.set(0.5);
            this.game.add.existing(button);

        }

    }
}
