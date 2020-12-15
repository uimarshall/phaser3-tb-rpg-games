/* eslint-disable no-unused-vars */
import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.score = 0;
    this.gameOver = false;
  }


 create() {
    //  create our world scene with the map we have loaded into memory in BootScene.
    /* The first row creates a tileset image. The next two rows add the layers to the map.
*two layers – the first one is called ‘Grass’ and contains only grass tiles,
 * the second is ‘Obstacles’ and there are some trees on it.
 * The method setCollisionByExclusion makes all tiles except the ones send, available for collision detection.
 * Sending -1 in our case makes all tiles on this layer collidable. */
    // this.map = this.add.tilemap(0, 0, config.width, config.height, 'map');
    this.map = this.make.tilemap({ key: 'map' });
    this.tiles = this.map.addTilesetImage('spritesheet', 'tiles');

    this.grass = this.map.createStaticLayer('Grass', this.tiles, 0, 0);
    this.obstacles = this.map.createStaticLayer('Obstacles', this.tiles, 0, 0);
    this.obstacles.setCollisionByExclusion([-1]);
    this.updateScore();

    const userName = this.add.text(
      400,
      8,
      `Player:${this.sys.game.globals.model.userName}`,
      {
        fontSize: '26px',
        color: '#fff',
      },
    );
    userName.setScrollFactor(0);

    // Add  player sprite.
    /** The first parameter is x coordinate, the second is y,
 * the third is the image resource and the last is its frame. */
    this.player = this.physics.add.sprite(50, 100, 'player', 6);

    // For moving on our world map we will use Phaser 3 Arcade physics.
    // make the player stay within the borders of the map
    this.physics.world.bounds.width = this.map.widthInPixels;
    this.physics.world.bounds.height = this.map.heightInPixels;
    this.player.setCollideWorldBounds(true);
    // this.physics.add.collider(this.player, this.obstacles);

    // Move on the map
    /* Its time to make the player sprite move on the map.
We need to process the user input. For this game we will use the arrow keys.
*/
    this.cursors = this.input.keyboard.createCursorKeys();

    // Make the camera follow the player's movt
    /**
 * The first row limits the camera to stay within the map boundaries.
 * The second makes the camera follow the player.
The third row this.cameras.main.roundPixels = true;
is a bit of a hack to prevent tiles bleeding – showing border lines on tiles.
 */
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    const exit = this.add.zone(900, 960, 80, 80);
    this.physics.world.enable(exit, 1);
    this.physics.add.overlap(this.player, exit, this.onExit, false, this);


    // Add Animations
    //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1,
    });

    // animation with key 'right'
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 6, 0, 12] }),
      frameRate: 10,
      repeat: -1,
    });

    // Add collision btw the player and obstacles
    this.physics.add.collider(this.player, this.obstacles);

    // Player meeting the enemy

    /** For the enemies locations I’ve decided to use a group of zone objects
    * (Phaser.GameObjects.Zone). When the player overlaps with such zone,
* a battle will be initiated.Phaser.GameObjects.Zone is an invisible object,
to be able to see it during development you can set debug: true like this: */

    // We create 30 zones
    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for (let i = 0; i < 30; i++) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      this.spawns.create(x, y, 20, 20);
    }

  

    // Make the player and zones interract
    /** When the player overlaps with one of the zones,
  * the onMeetEnemy method is called.  */
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
    this.sys.events.on('wake', this.wake, this);
  }

   updateScore() {
    this.score = this.sys.game.globals.model.score;
    this.scoreText = this.add.text(16, 8, `Score: ${this.score}`, {
      fontSize: '26px',
      fill: '#fff',
      backgroundColor: '#000',
    });
    this.scoreText.setScrollFactor(0);
  }

  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }

  onMeetEnemy(player, zone) {
    // we move the zone to some other location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // shake the world
    this.cameras.main.shake(300);

    // start battle
    // switch to BattleScene
    this.scene.switch('BattleScene');
  }

  //   Move the player with the physics engine
  update(time, delta) {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    // Add Animations
    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }
  }
}

export default GameScene;