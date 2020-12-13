import Phaser from 'phaser';



// The Scene that will load all the assets of the game
class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader', active: false });
  }

  init() {
    this.URL = this.sys.game.URL;
    this.CONFIG = this.sys.game.CONFIG;
  }

  ready () {
  this.readyCount++;
  if (this.readyCount === 2) {
    this.scene.start('Title');
  }
}

  preload() {

  // load assets needed in our game
  this.load.image('blueButton1', 'src/assets/images/blue_btn02.png');
  this.load.image('blueButton2', 'src/assets/images/blue_btn03.png');
//   this.load.image('phaserLogo', 'assets/logo.png');  

    // display progress bar
  var progressBar = this.add.graphics();
  var progressBox = this.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(240, 270, 320, 50);
 
  var width = this.cameras.main.width;
  var height = this.cameras.main.height;
  var loadingText = this.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      fill: '#ffffff'
    }
  });
  loadingText.setOrigin(0.5, 0.5);
 
  var percentText = this.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  percentText.setOrigin(0.5, 0.5);
 
  var assetText = this.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  assetText.setOrigin(0.5, 0.5);
 
  // update progress bar
  this.load.on('progress', function (value) {
    percentText.setText(parseInt(value * 100) + '%');
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(250, 280, 300 * value, 30);
  });
 
  // update file progress text
  this.load.on('fileprogress', function (file) {
    assetText.setText('Loading asset: ' + file.key);
  });
 
  // remove progress bar when complete
  this.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
    assetText.destroy();
  });

  // remove progress bar when complete
this.load.on('complete', function () {
  progressBar.destroy();
  progressBox.destroy();
  loadingText.destroy();
  percentText.destroy();
  assetText.destroy();
  this.ready();
}.bind(this));
 
this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
 
 
  
    // Load Background
//     this.bg = this.add.graphics({ x: 0, y: 0 });
//     this.bg.fillStyle('0xD6CDB0', 1);
//     this.bg.fillRect(0, 0, this.CONFIG.width, this.CONFIG.height);
//     // Create loading bar
//     this.createLoader();
//     this.load.setPath(`${this.URL}src/assets/images`);

//     // Spritesheets - include only key and file-name
//     this.load.spritesheet('tileset', 'fantasy-tileset.png', {
//       frameWidth: 32, // frame size
//       frameHeight: 32,
//       endFrame: 19,
//       margin: 2,
//       spacing: 4,
//     });
//     this.load.spritesheet('hero', 'hero.png', {
//       frameWidth: 32, // frame size
//       frameHeight: 32,
//       endFrame: 3,
//       margin: 2,
//       spacing: 4,
//     });
//     this.load.spritesheet('spider', 'spider.png', {
//       frameWidth: 32, // frame size
//       frameHeight: 32,
//       endFrame: 3,
//       margin: 2,
//       spacing: 4,
//     });

//     this.load.spritesheet('octo', 'Run.png', {
//       frameWidth: 32, // frame size
//       frameHeight: 32,
//       endFrame: 3,
//       margin: 2,
//       spacing: 4,
//     });
//   }


//   create() {
//     // Create sprite Animations
//     this.createAllAnims();


//     // Load Menu
//     this.time.addEvent({
//       delay: 2000,
//       callback: () => { this.scene.start('Menu'); },
//       callbackScope: this,


//     });
//   }

//   createLoader() {
//     // Title
//     this.title = new Title(this,
//       this.CONFIG.centerX,
//       75,
//       'Loading Game....',
//       'preload',
//       0.5);
//     // Progress text
//     this.txtProgress = new Title(
//       this,
//       this.CONFIG.centerX,
//       this.CONFIG.centerY - 5,
//       'Loading...',
//       { x: 0.5, y: 1 },

//     );
//     // Progress Bar
//     const x = 10;
//     const y = this.CONFIG.centerY + 5;
//     this.border = this.add.graphics({ x, y });

//     this.progress = this.add.graphics({ x, y });
//     // Callback
//     this.load.on('progress', this.onProgress, this);
//   }


//   onProgress(value) {
//     // Width of progress bar
//     const w = this.CONFIG.width - 2 * this.progress.x;
//     const h = 36;
//     this.progress.clear();
//     this.progress.fillStyle('0xFFFFFF', 1);
//     this.progress.fillRect(0, 0, w * value, h);
//     this.border.clear();
//     this.border.lineStyle(4, 0x2E67E3, 1);
//     this.border.strokeRect(0, 0, w * value, h);
//     // Percentage in progress text
//     this.txtProgress.setText(`${Math.round(value * 100)}%`);
//   }

//   // Create anims
//   createAllAnims() {
//     // Hero walking

//     this.anims.create({
//       key: 'hero-walk', // create animation named hero-walk
//       frames: this.anims.generateFrameNames('hero', { frames: [0, 1, 0, 2] }),
//       frameRate: 12,
//       repeat: -1, // -1 is for infinite loop

//     });
//     // Spider walking

//     this.anims.create({
//       key: 'spider-walk', // create animation named hero-walk
//       frames: this.anims.generateFrameNames('spider', { frames: [0, 1, 0, 2] }),
//       frameRate: 12,
//       repeat: -1, // -1 is for infinite loop

//     });
//     // Octo walking

//     this.anims.create({
//       key: 'octo-walk', // create animation named hero-walk
//       frames: this.anims.generateFrameNames('octo', { frames: [0, 1, 0, 2] }),
//       frameRate: 12,
//       repeat: -1, // -1 is for infinite loop

//     });
  }
}


export default PreloaderScene;