module AdventureRoo {
    export class TitleScreen extends Phaser.State {
        constructor() {
            super();
        }

        public init():void {
            this.game.stage.backgroundColor = '#ffffff';

            let levelEndTextStyle:any = {font: "45px Arial", fill: "#547980", align: "center"};
            let levelEndTextValue:string = 'A fun little adventure game! \n' +
                'Collect the drinks, get to the exit!';
            let levelEndText:Phaser.Text = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 5, levelEndTextValue, levelEndTextStyle);
            levelEndText.anchor.set(0.5);
            this.game.add.existing(levelEndText);

            let character:Phaser.Sprite = new Phaser.Sprite(this.game, this.game.width / 3 + 50, this.game.height / 3, 'MainCharacter', 0);
            this.game.add.existing(character);

            for ( let i:number = 0; i < 2; i++ ) {
                let drink:Phaser.Sprite = new Phaser.Sprite(this.game, this.game.width / 2 + (i * 50), this.game.height / 3, 'Drink', i);
                this.game.add.existing(drink);
            }

            let artCreditTextStyle:any = {font: "35px Arial", fill: "#547980", align: "center"};
            let artCreditTextValue:string = 'Art Tile set source: \nSimple Broad Purpose set';
            let artCreditText:Phaser.Text = new Phaser.Text(this.game, this.game.width / 2, this.game.height - 200, artCreditTextValue, artCreditTextStyle);
            artCreditText.anchor.set(0.5);
            this.game.add.existing(artCreditText);

            artCreditText.inputEnabled = true;
            artCreditText.input.enabled = true;
            artCreditText.input.useHandCursor = true;

            artCreditText.addColor('#351330', 20);

            artCreditText.events.onInputUp.add(()=> {
               window.open('http://opengameart.org/content/simple-broad-purpose-tileset', '_blank');
            });

            let button:Phaser.Button = new Phaser.Button(this.game, this.game.width / 2, this.game.height - 100, 'StartButton', ():void => {
                //Go to Game state
                this.game.state.start('GamePlay');
            });
            button.anchor.set(0.5);
            button.scale.set(0.8);
            this.game.add.existing(button);

        }

    }
}
