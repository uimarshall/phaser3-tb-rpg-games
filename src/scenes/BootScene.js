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
    // Bitmap font for PreloadScene

    // Set path to where fonts are located
    // this.load.setPath(`${this.URL}src/assets/fonts`);

    // Load bitmap
    // this.load.bitmapFont('ClickPixel', 'font.png', 'font.xml');
  }


  create() {
    this.scene.start('Preloader');
  }
}


export default BootScene;