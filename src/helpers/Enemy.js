import Phaser from 'phaser';
import PlayersHealthBar from './PlayersHealthBar';
import Unit from './Unit';


const Enemy = new Phaser.Class({
  Extends: Unit,

  initialize: function Enemy(scene, x, y, texture, frame, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    this.healthBar = new PlayersHealthBar(scene, x - 40, y + 50);
  },
});


export default Enemy;