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
            this.levelNumber = 'Level3';

        }

        public load( mainCharacter:Character, reward: Key, badGuy:Phaser.Group, collisionHandler:CollisionHandler ):void {
            //create the level background and platforms
            this.map = this.game.add.tilemap(this.levelNumber);
            this.map.addTilesetImage(this.map.tilesets[0].name, this.map.tilesets[0].name);

            //console.log('map', this.map);

            this.groundLayer = this.map.createLayer(this.levelNumber);
            this.groundLayer.resizeWorld();

            collisionHandler.addBackgroundLayer(this.groundLayer);

            this.map.setCollision(11, true, this.levelNumber);
            this.map.setCollision(13, true, this.levelNumber);
            this.map.setCollision(3, true, this.levelNumber);
            this.map.setCollision(7, true, this.levelNumber);

            this.map.objects.Characters.forEach(( element ) => {
                switch (element.name) {
                    case 'reward':
                        let frameNum: number = Math.ceil(this.getRandomNumber(0, 17));
                        console.log('frameNum', frameNum)
                        reward = new Key(this.game, element.x, element.y, 'Drink', frameNum);
                        collisionHandler.addReward(reward);
                        break;
                    case 'key':
                        let key = new Key(this.game, element.x, element.y, 'Key', 0);
                        collisionHandler.addKey(key);
                        break;
                    case 'mainCharacter':
                        mainCharacter = new Character(this.game, element.x, element.y, this.groundLayer, reward);
                        this.game.add.existing(mainCharacter);
                        collisionHandler.addMainCharacter(mainCharacter);
                        break;
                    case 'rat':
                        let rat = new BadCharacter(this.game, element.x, element.y, 'Rat', 0);
                        badGuy.add(rat);
                        collisionHandler.addEnemies(rat);
                        break;
                    case 'scorpion':
                        let scorpion = new BadCharacter(this.game, element.x, element.y, 'Scorpion', 0);
                        badGuy.add(scorpion);
                        collisionHandler.addEnemies(scorpion);
                        break;
                    case 'exitDoor':
                        let exitDoor = new Door(this.game, element.x, element.y, 'Door', 3);
                        collisionHandler.addExitDoor(exitDoor);
                        break;
                    case 'normalDoor':
                        let normalDoor = new Door(this.game, element.x, element.y, 'Door', 10);
                        collisionHandler.addNormalDoor(normalDoor);
                        break;
                    case 'exitSign':
                        let exitSign = new Phaser.Sprite(this.game, element.x, element.y, 'Fixtures', 15);
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
