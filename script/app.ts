module AdventureRoo {
    export class Game {
        game: Phaser.Game;
        constructor() {
            this.game = new Phaser.Game(Global.GameWidth, Global.GameHeight, Phaser.AUTO, 'content');

            //load your states
            this.game.state.add('Preloader', Preloader, false);
            this.game.state.add('TitleScreen', TitleScreen, false);
            this.game.state.add('GamePlay', GamePlay, false);

        }

        public start(){
            this.game.state.start('Preloader');
        }
    }
}
