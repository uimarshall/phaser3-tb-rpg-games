import Phaser from 'phaser';
import Model from '../helpers/Model';

import config from './config';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
  }
}

export default Game;
