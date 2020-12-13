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
    this.createPlayer()
  }

  createPlatforms(){

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform')
  }

  createPlayer(){
    this.player = this.physics.add.sprite(100, 450, 'hero');

this.player.setBounce(0.2);
this.player.setCollideWorldBounds(true);

// Add collision btw player and platforms
this.physics.add.collider(this.player, this.platforms);

this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'hero', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});
  }
}

export default GameScene;