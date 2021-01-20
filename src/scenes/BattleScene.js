/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import Phaser from 'phaser';
import Enemy from '../helpers/Enemy';
import PlayerCharacter from '../helpers/PlayerCharacter';

class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create() {
    // change the background to green
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.startBattle();
    // on wake event we call startBattle too
    this.sys.events.on('wake', this.startBattle, this);
  }

  startBattle() {
    // player character - warrior
    const warrior = new PlayerCharacter(
      this,
      630,
      60,
      'guard1',
      null,
      'Warrior',
      140,
      25,
    );
    this.add.existing(warrior);

    // player character - guard
    const knight = new PlayerCharacter(
      this,
      630,
      200,
      'guard2',
      null,
      'The Guard',
      145,
      20,
    );
    this.add.existing(knight);

    // player character - beast
    const beast = new PlayerCharacter(
      this,
      630,
      340,
      'guard3',
      null,
      'The Reaper',
      135,
      30,
    );
    this.add.existing(beast);

    const enemy1 = new Enemy(
      this,
      220,
      130,
      'enemy1',
      null,
      'Gnu Warrior',
      170,
      30,
    );
    const enemy2 = new Enemy(
      this,
      80,
      90,
      'enemy2',
      null,
      'Andromalius Monster',
      60,
      10,
    );
    const mage1 = new Enemy(this, 80, 200, 'mage1', null, 'Light Mage', 80, 15);
    const mage2 = new Enemy(this, 80, 310, 'mage2', null, 'Dark Mage', 100, 20);
    const mage3 = new Enemy(
      this,
      210,
      280,
      'mage3',
      null,
      'Super Mage',
      120,
      25,
    );
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
    this.units.forEach((unit) => unit.healthBar.draw()); // add the healthbars
    this.index = -1; // currently active unit
    // Run UI Scene at the same time
    this.scene.run('UIScene');
  }

  nextTurn() {
    if (this.checkEndBattle()) {
      this.endBattle(this.checkEndBattle());
      return;
    }
    do {
      this.index += 1;
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);
    if (this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit('PlayerSelect', this.index);
    } else {
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);
      this.units[this.index].attack(this.heroes[r]);
      const hero = this.heroes[r];
      hero.healthBar.decrease(100 * (hero.hp / hero.maxHp));

      this.time.addEvent({
        delay: 2300,
        callback: this.nextTurn,
        callbackScope: this,
      });
    }
  }

  // check for game over or victory
  checkEndBattle() {
    let victory = true;
    // if all enemies are dead we have victory
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].living) victory = false;
    }
    let gameOver = true;
    // if all heroes are dead we have game over
    for (let i = 0; i < this.heroes.length; i++) {
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

  // when the player have selected the enemy to be attacked
  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
      const enemy = this.enemies[target];
      enemy.healthBar.decrease(100 * (enemy.hp / enemy.maxHp));
    }
    // next turn in 3 seconds
    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this,
    });
  }

  endBattle(result) {
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
      // sleep the UI
      this.scene.sleep('UIScene');
      this.scene.switch('GameOver');
    } else if (result === 'victory') {
      this.scene.sleep('UIScene');
      // return to GameScene and sleep current BattleScene
      this.scene.switch('Game');
    }
  }

  updateScore(e, h) {
    let { score } = this.sys.game.globals.model;
    score += (e + h) * 10;
    this.sys.game.globals.model.score = score;
  }
}

export default BattleScene;
