import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.score = 0
  }

  preload() {
    // load images
    // this.load.image('logo', 'src/assets/images/logo.png');
  }

  create() {
    this.add.image(400, 300, 'sky');
    // this.add.spritesheet(400, 300, 'tileset');
    this.createPlatforms();
    this.createPlayer();
    this.createCursors();
    this.createStars()

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform');
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, 'hero');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Add collision btw player and platforms
    this.physics.add.collider(this.player, this.platforms);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'hero', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createCursors() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createStars(){
    this.stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
});

this.stars.children.iterate((child)=> {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});
this.physics.add.collider(this.stars, this.platforms);
this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);



  }
   collectStar (player, star)
{
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
}

  // Update loop
  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

export default GameScene;