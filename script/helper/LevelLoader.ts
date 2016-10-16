module AdventureRoo {
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
            this.levelNumber = 'Level' + Global.Level.toString();
            this.levelNumber = 'Level2';
            this.game = game;
        }
        public load(mainCharacter: Character, reward: Phaser.Sprite, badGuy: Phaser.Group):void {
            //create the level background and platforms
            this.map = this.game.add.tilemap(this.levelNumber);
            this.map.addTilesetImage(this.map.tilesets[0].name, this.levelData[this.levelNumber]);

            this.groundLayer = this.map.createLayer(this.levelNumber);
            this.groundLayer.resizeWorld();

            this.map.setCollision(11, true, this.levelNumber);
            this.map.setCollision(3, true, this.levelNumber);

            console.log(this.map.tilesets[0].name);
            this.map.objects.Characters.forEach((element) =>{
                console.log(element);
                switch (element.name){
                    case 'reward':
                        //todo move this to separate class
                        reward = new Phaser.Sprite(this.game, element.x, element.y, 'Rewards', 1);
                        this.game.add.existing(reward);
                        this.game.physics.arcade.enable(reward);
                        break;
                    case 'mainCharacter':
                        mainCharacter = new Character(this.game, element.x, element.y, this.groundLayer, reward);
                        this.game.add.existing(mainCharacter);
                        break;
                    case 'rat':
                        var rat = new BadCharacter(this.game, element.x, element.y,'Rat', this.groundLayer);
                        badGuy.add(rat);
                        break;
                    case 'door':
                        var door = new Phaser.Sprite(this.game, element.x, element.y, 'Fixtures', 0);
                        this.game.add.existing(door);
                        break;
                    case 'exitSign':
                        var exitSign = new Phaser.Sprite(this.game, element.x, element.y, 'Fixtures', 15);
                        this.game.add.existing(exitSign);
                        break;
                }


            });

        }

        public update():void {
            this.game.physics.arcade.collide(this.badGuy, this.mainCharacter, this.mainCharacter.collisionHandler,
                null, this.mainCharacter);
            this.game.physics.arcade.collide(this.reward, this.mainCharacter, this.mainCharacter.collisionHandler,
                null, this.mainCharacter);
        }

    }
}
