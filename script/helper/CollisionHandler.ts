module AdventureRoo {
    export class CollisionHandler {
        public game: Phaser.Game;
        public enemyList: any[];
        public mainCharacter: any;
        public reward: any;
        public backgroundLayer: any;
        public door: any;
        public onLevelComplete: Phaser.Signal;

        constructor(game: Phaser.Game) {
            this.game = game;
        }

        public setDefaults(): void{
            this.enemyList = [];
            this.mainCharacter = null;
            this.reward = null;
            this.backgroundLayer = null;
            this.door = null;
        }

        public addEnemies(enemy: BadCharacter): void {
            this.enemyList.push(enemy);
        }

        public addBackgroundLayer(backgroundLayer: any): void {
            this.backgroundLayer = backgroundLayer;
        }

        public addMainCharacter(mainCharacter: Character): void {
            this.mainCharacter = mainCharacter;
        }

        public addReward(reward: Phaser.Sprite): void {
            this.reward = reward;
        }

        public addDoor(door: Phaser.Sprite): void {
            this.door = door;
        }

        public addLevelCompleteSignal(onlevelComplete: Phaser.Signal): void {
            this.onLevelComplete = onlevelComplete;
        }


        public setRewardComplete(): void {
            this.door.isOpened();
            this.reward.isPickedUp();
            this.mainCharacter.hasReward = true;
            console.log(this.mainCharacter.hasReward);
        }

        public checkLevelComplete(): void {
            console.log('evel complete called');
            if(this.mainCharacter.hasReward){
                this.onLevelComplete.dispatch();
                this.door.body.enable = false;
                this.mainCharacter.levelComplete();
            }
        }

        public update():void {
            this.enemyList.forEach((enemy)=>{
                this.game.physics.arcade.collide(enemy, this.mainCharacter, this.mainCharacter.prepareForDeath,
                    null, this.mainCharacter);
                this.game.physics.arcade.collide(enemy, this.backgroundLayer);
                this.game.physics.arcade.collide(this.door, enemy);
            });

            this.game.physics.arcade.collide(this.mainCharacter, this.backgroundLayer);
            this.game.physics.arcade.collide(this.door, this.backgroundLayer);
            this.game.physics.arcade.collide(this.door, this.mainCharacter, this.checkLevelComplete,
                null, this);

            this.game.physics.arcade.collide(this.reward, this.mainCharacter, this.setRewardComplete,
                null, this);


       /*     this.game.physics.arcade.collide(this.badGuy, this.mainCharacter, this.mainCharacter.collisionHandler,
                null, this.mainCharacter);
            this.game.physics.arcade.collide(this.reward, this.mainCharacter, this.mainCharacter.collisionHandler,
                null, this.mainCharacter);*/

            //this.game.physics.arcade.collide(this.mainCharacter, this.groundLayer);
            //this.game.physics.arcade.collide(this.badGuy, this.groundLayer);
            //this.game.physics.arcade.collide(this.badGuy, this.mainCharacter, this.mainCharacter.collisionHandler,
            //    null, this.mainCharacter);
            //this.game.physics.arcade.collide(this.reward, this.mainCharacter, this.mainCharacter.collisionHandler,
            //    null, this.mainCharacter);
        }

    }
}
