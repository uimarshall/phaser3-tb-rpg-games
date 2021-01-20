import Phaser from 'phaser';
// The Scene that will start the game
class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  init() {
    this.URL = this.sys.game.URL;
    this.CONFIG = this.sys.game.CONFIG;
  }

  create() {
    this.scene.start('Preloader');
  }
}

export default BootScene;
