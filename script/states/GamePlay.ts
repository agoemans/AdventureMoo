module AdventureRoo {
    export class GamePlay extends Phaser.State {
        public static Level:number;
        public map:any;
        public groundLayer:any;
        public mainCharacter:Character;
        public badGuy:BadCharacter;
        public reward:Key;

        public badGuyGroup:Phaser.Group;

        public levelLoader:LevelLoader;
        public collisionHandler:CollisionHandler;
        public onLevelEnd:Phaser.Signal;

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

            this.onLevelEnd = new Phaser.Signal();
            this.onLevelEnd.add((endGameType)=> {
                this.showLevelEndDialog(endGameType);
            });

            this.collisionHandler = new CollisionHandler(this.game);
            this.collisionHandler.setDefaults();
            this.collisionHandler.setLevelCompleteSignal(this.onLevelEnd);

            this.levelLoader = new LevelLoader(this.game);
            this.levelLoader.load(this.mainCharacter, this.reward, this.badGuyGroup, this.collisionHandler);
            console.log(this.mainCharacter);
            console.log(this.reward);
        }

        public update():void {
            this.collisionHandler.update();
        }

        public showLevelEndDialog(endGameType: boolean):void {
            let endGameDialog = new EndGameDialog(this.game, endGameType);
            this.game.add.existing(endGameDialog);
            endGameDialog.x = this.game.height / 3;
            endGameDialog.y = 100;
        }
    }
}
