module AdventureRoo {
    export class CollisionHandler {
        public game: Phaser.Game;
        public enemyList: Enemy[];
        public mainCharacter: Character;
        public reward: Key;
        public backgroundLayer: any;
        public exitDoor: Door;
        public key: Key;
        public normalDoor: Door;
        public onLevelEnd: Phaser.Signal = new Phaser.Signal;

        constructor(game: Phaser.Game) {
            this.game = game;
        }

        public setDefaults(): void{
            this.enemyList = [];
            this.mainCharacter = null;
            this.reward = null;
            this.backgroundLayer = null;
            this.exitDoor = null;
            this.normalDoor = null;
            this.key = null;
        }

        public addEnemies(enemy: Enemy): void {
            this.enemyList.push(enemy);
        }

        public addBackgroundLayer(backgroundLayer: any): void {
            this.backgroundLayer = backgroundLayer;
        }

        public addMainCharacter(mainCharacter: Character): void {
            this.mainCharacter = mainCharacter;
        }

        public addReward(reward: Key): void {
            this.reward = reward;
        }

        public addExitDoor(door: Door): void {
            this.exitDoor = door;
        }

        public addNormalDoor(door: Door): void {
            this.normalDoor = door;
        }

        public addKey(key: Key): void {
            this.key = key;
        }

        public setLevelCompleteSignal(onlevelEnd: Phaser.Signal): void {
            this.onLevelEnd = onlevelEnd;
        }

        public setRewardComplete(): void {
            this.exitDoor.isOpened();
            this.reward.isPickedUp();
            this.mainCharacter.hasReward = true;
            console.log(this.mainCharacter.hasReward);
        }

        public setLevelComplete(): void {
            if(this.mainCharacter.hasReward){
                this.onLevelEnd.dispatch(false);
                this.exitDoor.disableForCollision();
                this.mainCharacter.levelComplete();
            }
        }

        public setLevelFail(): void {
            //this.onLevelEnd.dispatch();
            this.mainCharacter.prepareForDeath();
            this.onLevelEnd.dispatch(true);
        }

        public update():void {
            //todo check for perf
            this.enemyList.forEach((enemy)=>{
                this.game.physics.arcade.collide(enemy, this.mainCharacter, this.setLevelFail,
                    null, this);
                this.game.physics.arcade.collide(enemy, this.backgroundLayer, enemy.turnAround, null, enemy);
                this.game.physics.arcade.collide(this.exitDoor, enemy);
            });

            this.game.physics.arcade.collide(this.mainCharacter, this.backgroundLayer);
            this.game.physics.arcade.collide(this.exitDoor, this.mainCharacter, this.setLevelComplete,
                null, this);

            this.game.physics.arcade.collide(this.reward, this.mainCharacter, this.setRewardComplete,
                null, this);

            if(this.key != null){
                this.game.physics.arcade.collide(this.key, this.mainCharacter, this.key.isPickedUp,
                    null, this);

                this.game.physics.arcade.collide(this.normalDoor, this.mainCharacter, this.normalDoor.disableForCollision,
                    null, this);
            }
        }

    }
}
