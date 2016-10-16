module AdventureRoo {
    export class GamePlay extends Phaser.State {
        public map:any;
        public groundLayer:any;
        public mainCharacter: Character;
        public badGuy: BadCharacter;
        public reward: any;
        constructor() {
            super();
        }

        public init():void {
            this.game.stage.backgroundColor = '#ffffff';
        }

        public preload():void {
            this.map = this.game.add.tilemap('level1');
            this.map.addTilesetImage('tile4', 'Tile4');

            this.groundLayer = this.map.createLayer('Level1');
            this.groundLayer.resizeWorld();

            this.map.setCollision(11, true, 'Level1');
            this.map.setCollision(3, true, 'Level1');

            this.mainCharacter = new Character(this.game, 50, this.game.height * 0.85);
            this.game.add.existing(this.mainCharacter);

            this.badGuy = new BadCharacter(this.game, this.game.width * 0.8, this.game.height * 0.9, 'Rat');
            this.game.add.existing(this.badGuy);

            this.reward = new Phaser.Sprite(this.game, 300, 90, 'Rewards', 1);
            this.game.add.existing(this.reward);
            this.game.physics.arcade.enable(this.reward);
        }

        public update():void {
            this.game.physics.arcade.collide(this.mainCharacter, this.groundLayer);
            this.game.physics.arcade.collide(this.badGuy, this.groundLayer);
            this.game.physics.arcade.collide(this.badGuy, this.mainCharacter, this.mainCharacter.collisionHandler,
                null, this.mainCharacter);
            this.game.physics.arcade.collide(this.reward, this.mainCharacter, this.mainCharacter.collisionHandler,
                null, this.mainCharacter);
        }
    }
}