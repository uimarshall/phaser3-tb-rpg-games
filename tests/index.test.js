import 'jest-canvas-mock';
import Phaser from 'phaser';

import config from '../src/app/config';
import Model from '../src/helpers/Model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.start('BootScene');
  }
}
window.game = new Game();
test('should be a testament of the proper configuration of jest to handle ES6, import and canvas, working with webpacked assets (with mocking for images and css)', () => {
  expect(window.game).not.toBe(undefined);
});
