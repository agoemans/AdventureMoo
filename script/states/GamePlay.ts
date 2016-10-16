module AdventureRoo {
    export class GamePlay extends Phaser.State {
        public static Level: number;
        public map:any;
        public groundLayer: any;
        public mainCharacter: Character;
        public badGuy: BadCharacter;
        public reward: any;

        public badGuyGroup: Phaser.Group;

        public levelLoader: LevelLoader;
        public collisionHandler: CollisionHandler;
        public onLevelComplete: Phaser.Signal;

        constructor() {
            super();
        }

        public init():void {
            this.game.stage.backgroundColor = '#bab397';
        }

        public preload():void {
            this.game.world.shutdown();
            this.badGuyGroup = new Phaser.Group(this.game, null, 'badGuyGroup');
            this.game.add.existing(this.badGuyGroup);

            this.onLevelComplete = new Phaser.Signal();
            this.onLevelComplete.add(()=>{
                this.showLevelCompleteDialog();
            });

            this.collisionHandler = new CollisionHandler(this.game);
            this.collisionHandler.setDefaults();
            this.collisionHandler.addLevelCompleteSignal(this.onLevelComplete);

            this.levelLoader = new LevelLoader(this.game);
            this.levelLoader.load(this.mainCharacter, this.reward, this.badGuyGroup, this.collisionHandler);
            console.log(this.mainCharacter);
            console.log(this.reward);
            //this.map = this.game.add.tilemap('level1');
            //this.map.addTilesetImage('tile4', 'Tile4');
            //
            //this.groundLayer = this.map.createLayer('Level1');
            //this.groundLayer.resizeWorld();
            //
            //this.map.setCollision(11, true, 'Level1');
            //this.map.setCollision(3, true, 'Level1');
            //
            //this.mainCharacter = new Character(this.game, 50, this.game.height * 0.85);
            //this.game.add.existing(this.mainCharacter);
            //
            //this.badGuy = new BadCharacter(this.game, this.game.width * 0.8, this.game.height * 0.9, 'Rat');
            //this.game.add.existing(this.badGuy);
            //
            //this.reward = new Phaser.Sprite(this.game, 300, 90, 'Rewards', 1);
            //this.game.add.existing(this.reward);
            //this.game.physics.arcade.enable(this.reward);
        }

        public update():void {
            this.collisionHandler.update();
        }

        public showLevelCompleteDialog():void {
            var endGameDialog = new EndGameDialog(this.game, 100, 100);
            this.game.add.existing(endGameDialog);
            endGameDialog.x = 100;
            endGameDialog.y = 100;

            console.log('show end dialog', endGameDialog)
        }
    }
}
