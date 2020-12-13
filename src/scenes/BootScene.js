import Phaser from 'phaser';
// The Scene that will start the game
class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene', active: true });
  }

  init() {
    this.URL = this.sys.game.URL;
    this.CONFIG = this.sys.game.CONFIG;
  }

  preload() {
    
  }


  create() {
    this.scene.start('Preloader');
  }
}


export default BootScene;