/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */

import Phaser from 'phaser';
import Enemy from '../helpers/Enemy';
import PlayerCharacter from '../helpers/PlayerCharacter';
// import PlayerCharacter from '../components/PlayerCharacter';
// import Enemy from '../components/Enemy';


class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create() {
    this.back = this.add.image(400, 300, 'background');
    this.startBattle();
    this.sys.events.on('wake', this.startBattle, this);
    // change the background to green
    // this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    // this.startBattle();
    // const timeEvent = this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
    // this.sys.events.on('wake', this.wake, this);
  }

  startBattle() {
    // player character - warrior
    const warrior = new PlayerCharacter(this, 630, 60, 'guard1', null, 'Warrior', 140, 25);
    this.add.existing(warrior);

    // player character - guard
     const knight = new PlayerCharacter(this, 630, 200, 'guard2', null, 'Knight', 145, 20);
    this.add.existing(knight);

   // player character - beast
    const beast = new PlayerCharacter(this, 630, 340, 'guard3', null, 'Beast', 135, 30);
    this.add.existing(beast);

    const enemy1 = new Enemy(this, 220, 130, 'enemy1', null, 'Gnu Warrior', 170, 30);
    const enemy2 = new Enemy(this, 80, 90, 'enemy', null, 'Andromalius', 60, 10);
    const mage1 = new Enemy(this, 80, 200, 'mage1', null, 'Light Mage', 80, 15);
    const mage2 = new Enemy(this, 80, 310, 'mage2', null, 'Dark Mage', 100, 20);
    const mage3 = new Enemy(this, 210, 280, 'mage3', null, 'Super Mage', 120, 25);
 // array with enemies
    this.allEnemies = [enemy2, mage1, mage2, enemy1, mage3];

    this.enemies = this.allEnemies.filter((enemy) => {
      if (Math.random() > 0.44) {
        this.add.existing(enemy);
        return enemy;
      }
    });
    if (this.enemies.length === 0) {
      this.enemies = [enemy2];
      this.add.existing(enemy2);
    }
// array with heroes
    this.heroes = [warrior, knight, beast];
     // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);
    this.units.forEach(unit => unit.healthBar.draw()); // add the healthbars
    this.index = -1; // currently active unit
     // Run UI Scene at the same time
    this.scene.run('UIScene');

  }

  // We need to add the wake function.
  // It will run the UIScene and will add a timed event to exit the BattleScene:
  wake() {
    this.scene.run('UIScene');
    this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
  }


  // And BattleScene will control the UIScene.
  // Lets see how to return back to the WorldScene.
  // exitBattle() {
  //   this.scene.sleep('UiScene');// make UiScene not active and not visible
  //   this.scene.switch('WorldScene');
  // }


  checkEndBattle() {
    let victory = true;
    // if all enemies are dead we have victory
    for (var i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].living) victory = false;
    }
    let gameOver = true;
    // if all heroes are dead we have game over
    for (var i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].living) gameOver = false;
    }

     if (victory) {
      return 'victory';
    }
    if (gameOver) {
      return 'gameOver';
    }
    return victory || gameOver;
  }


  endBattle() {
    this.updateScore(this.enemies.length, this.heroes.length);
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i++) {
      // link item
      this.units[i].destroy();
    }
    this.units.length = 0;
     this.index = -1;
      if (result === 'gameOver') {
      this.scene.stop('Game');
      this.scene.sleep('UIScene');
      this.scene.switch('GameOver');
    } else if (result === 'victory') {
      this.scene.sleep('UIScene');
      this.scene.switch('Game');
    }
    // sleep the UI
    // this.scene.sleep('UIScene');
    // return to WorldScene and sleep current BattleScene
    // this.scene.switch('WorldScene');
  }

  updateScore(e, h) {
    let { score } = this.sys.game.globals.model;
    score += (e + h) * 10;
    this.sys.game.globals.model.score = score;
  }


  nextTurn() {
    // if we have victory or game over
    if (this.checkEndBattle()) {
      this.endBattle(this.checkEndBattle());
      return;
    }
    do {
      this.index++;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (this.units[this.index].living);
    // if its player hero
    if (this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit('PlayerSelect', this.index);
    } else { // else if its enemy unit
      // pick random hero
      const r = Math.floor(Math.random() * this.heroes.length);
      // call the enemy's attack function
      this.units[this.index].attack(this.heroes[r]);
      const hero = this.heroes[r];
      hero.healthBar.decrease(100 * (hero.hp / hero.maxHp));
      // add timer for the next turn, so will have smooth gameplay
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    }
  }

  receivePlayerSelection(action, target) {
    if (action == 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  }
}

export default BattleScene;
