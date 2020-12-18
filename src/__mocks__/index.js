import 'jest-canvas-mock';
import Phaser from 'phaser';

import config from '../app/config';
import Model from '../helpers/Model';




class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.start('BootScene');
  }
}

export default Game;