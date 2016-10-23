module AdventureRoo {
    import Collator = Intl.Collator;
    export class LevelLoader {
        public game:Phaser.Game;
        public gameplayHolder:GamePlay;
        public map:any;
        public groundLayer:any;
        public mainCharacter:Character;
        public badGuy:BadCharacter;
        public reward:any;
        public levelNumber:string;

        constructor( game:Phaser.Game ) {
            this.game = game;
            //this.levelNumber = 'Level' + Global.Level.toString();
            this.levelNumber = 'Level1';

        }

        public load( mainCharacter:Character, reward: Key, badGuy:Phaser.Group, collisionHandler:CollisionHandler ):void {
            //create the level background and platforms
            this.map = this.game.add.tilemap(this.levelNumber);
            this.map.addTilesetImage(this.map.tilesets[0].name, this.map.tilesets[0].name);

            console.log('map', this.map);

            this.groundLayer = this.map.createLayer(this.levelNumber);
            this.groundLayer.resizeWorld();

            collisionHandler.addBackgroundLayer(this.groundLayer);

            this.map.setCollision(11, true, this.levelNumber);
            this.map.setCollision(13, true, this.levelNumber);
            this.map.setCollision(3, true, this.levelNumber);
            this.map.setCollision(7, true, this.levelNumber);

            //console.log(this.map.tilesets[0].name);
            this.map.objects.Characters.forEach(( element ) => {
                //console.log(element);
                switch (element.name) {
                    case 'reward':
                        var frameNum: number = Math.ceil(this.getRandomNumber(0, 17));
                        console.log('frameNum', frameNum)
                        reward = new Key(this.game, element.x, element.y, 'Drink', frameNum);
                        collisionHandler.addReward(reward);
                        break;
                    case 'key':
                        var key = new Key(this.game, element.x, element.y, 'Key', 1);
                        collisionHandler.addKey(key);
                        break;
                    case 'mainCharacter':
                        mainCharacter = new Character(this.game, element.x, element.y, this.groundLayer, reward);
                        this.game.add.existing(mainCharacter);
                        collisionHandler.addMainCharacter(mainCharacter);
                        break;
                    case 'rat':
                        var rat = new BadCharacter(this.game, element.x, element.y, 'Rat', 0);
                        //rat.setLayerInfo(this.map, this.groundLayer);
                        badGuy.add(rat);
                        collisionHandler.addEnemies(rat);
                        break;
                    case 'scorpion':
                        var scorpion = new BadCharacter(this.game, element.x, element.y, 'Scorpion', 0);
                        //rat.setLayerInfo(this.map, this.groundLayer);
                        badGuy.add(scorpion);
                        collisionHandler.addEnemies(scorpion);
                        break;
                    case 'exitDoor':
                        var exitDoor = new Door(this.game, element.x, element.y, 'Door', 3);
                        collisionHandler.addExitDoor(exitDoor);
                        break;
                    case 'normalDoor':
                        var normalDoor = new Door(this.game, element.x, element.y, 'Door', 10);
                        collisionHandler.addNormalDoor(normalDoor);
                        break;
                    case 'exitSign':
                        var exitSign = new Phaser.Sprite(this.game, element.x, element.y, 'Fixtures', 15);
                        this.game.add.existing(exitSign);
                        break;
                }

            });

        }

        public getRandomNumber(min: number, max: number): number {
            return Math.random() * (max - min) + min;

        }
    }
}
