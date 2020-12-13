class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
 preload () {
    // load images
    this.load.image('logo', 'src/assets/images/logo.png');
  }
 
  create () {
    this.add.image(400, 300, 'logo');
  }
};

export default  GameScene