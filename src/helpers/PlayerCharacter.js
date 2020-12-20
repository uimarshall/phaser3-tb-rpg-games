import Phaser from 'phaser';
import PlayersHealthBar from './PlayersHealthBar';
import Unit from './Unit';


const PlayerCharacter = new Phaser.Class({
  Extends: Unit,

  initialize: function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    this.flipX = true;
    this.healthBar = new PlayersHealthBar(scene, x - 45, y + 30);
  },
});


export default PlayerCharacter;