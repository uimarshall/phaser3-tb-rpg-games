import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    // this.load.image('logo', 'src/assets/images/logo.png');
  }

  create() {
    this.add.image(400, 300, 'sky');
    // this.add.spritesheet(400, 300, 'tileset');
    this.createPlatforms()
  }

  createPlatforms(){

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform')
  }
}

export default GameScene;