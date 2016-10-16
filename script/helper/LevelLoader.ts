module AdventureRoo {
    import Collator = Intl.Collator;
    export class LevelLoader {
        public game: Phaser.Game;
        public gameplayHolder: GamePlay;
        public map:any;
        public groundLayer:any;
        public mainCharacter: Character;
        public badGuy: BadCharacter;
        public reward: any;
        public levelNumber: string;

        public levelData: any = {
            'Level1': 'Tile4',
            'Level2': 'Tile1'
        };

        constructor(game: Phaser.Game) {
            this.game = game;
            this.levelNumber = 'Level' + Global.Level.toString();
            //this.levelNumber = 'Level2';

        }
        public load(mainCharacter: Character, reward: Phaser.Sprite, badGuy: Phaser.Group, collisionHandler: CollisionHandler):void {
            //create the level background and platforms
            this.map = this.game.add.tilemap(this.levelNumber);
            this.map.addTilesetImage(this.map.tilesets[0].name, this.levelData[this.levelNumber]);

            this.groundLayer = this.map.createLayer(this.levelNumber);
            this.groundLayer.resizeWorld();

            collisionHandler.addBackgroundLayer(this.groundLayer);

            this.map.setCollision(11, true, this.levelNumber);
            this.map.setCollision(3, true, this.levelNumber);
            this.map.setCollision(7, true, this.levelNumber);

            console.log(this.map.tilesets[0].name);
            this.map.objects.Characters.forEach((element) =>{
                console.log(element);
                switch (element.name){
                    case 'reward':
                        //todo move this to separate class
                        reward = new Reward(this.game, element.x, element.y);
                        collisionHandler.addReward(reward);
                        break;
                    case 'mainCharacter':
                        mainCharacter = new Character(this.game, element.x, element.y, this.groundLayer, reward);
                        this.game.add.existing(mainCharacter);
                        collisionHandler.addMainCharacter(mainCharacter);
                        break;
                    case 'rat':
                        var rat = new BadCharacter(this.game, element.x, element.y,'Rat', this.groundLayer);
                        badGuy.add(rat);
                        collisionHandler.addEnemies(rat);
                        break;
                    case 'door':
                        var door = new Door(this.game, element.x, element.y);
                        collisionHandler.addDoor(door);
                        break;
                    case 'exitSign':
                        var exitSign = new Phaser.Sprite(this.game, element.x, element.y, 'Fixtures', 15);
                        this.game.add.existing(exitSign);
                        break;
                }


            });

        }
    }
}
