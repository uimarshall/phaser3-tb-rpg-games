/* eslint-disable no-plusplus */
import Phaser from 'phaser';
import logo1 from '../../assets/images/logo.png';
import forest from '../../assets/images/forest.png';

import btn01 from '../../assets/images/blue_btn02.png';
import btn02 from '../../assets/images/blue_btn03.png';
import greyBox from '../../assets/images/grey_box.png';
import checkBox from '../../assets/images/blue_boxCheckmark.png';
import audioTheme from '../../assets/audio/TownTheme.mp3';
import tiles from '../../assets/map/tiles_castle.png';
import mapJson from '../../assets/map/map.json';
import guard1 from '../../assets/images/guard1.png';
import guard2 from '../../assets/images/guard2.png';
import guard3 from '../../assets/images/guard3.png';
import player from '../../assets/images/player.png';
import enemy1 from '../../assets/images/enemy_1.png';
import enemy2 from '../../assets/images/enemy.png';
import mage1 from '../../assets/images/mage_1.png';
import mage2 from '../../assets/images/mage_2.png';
import mage3 from '../../assets/images/mage_3.png';

// The Scene that will load all the assets of the game
class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.URL = this.sys.game.URL;
    this.CONFIG = this.sys.game.CONFIG;
  }

  preload() {
    this.load.image('title', logo1);
    this.load.image('background', forest);
    // load assets needed in our game
    this.load.image('blueButton1', btn01);
    this.load.image('blueButton2', btn02);
    this.load.image('box', greyBox);
    this.load.image('checkedBox', checkBox);
    this.load.audio('bgMusic', [audioTheme]);

    // map tiles
    this.load.image('tiles', tiles);

    // map in json format
    this.load.tilemapTiledJSON('map', mapJson);

    this.load.image('guard1', guard1);
    this.load.image('guard2', guard2);
    this.load.image('guard3', guard3);

    // our two characters
    this.load.spritesheet('player', player, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('enemy2', enemy2, {
      frameWidth: 57,
      frameHeight: 88,
    });
    this.load.spritesheet('enemy1', enemy1, {
      frameWidth: 120,
      frameHeight: 100,
    });
    this.load.spritesheet('mage1', mage1, {
      frameWidth: 85,
      frameHeight: 94,
    });
    this.load.spritesheet('mage2', mage2, {
      frameWidth: 122,
      frameHeight: 110,
    });
    this.load.spritesheet('mage3', mage3, {
      frameWidth: 87,
      frameHeight: 110,
    });

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });
  }

  ready() {
    this.scene.start('UserScene');
  }
}

export default PreloaderScene;
