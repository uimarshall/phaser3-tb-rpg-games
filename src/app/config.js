import Phaser from 'phaser';


// Scenes
const scenes = [BootScene, Preloader, Menu, GameScene];

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-app',
  title: 'Treasure of condor',
  url: '',
  width: 360,
  height: 640,
  scene: scenes,
  zoom: 2,
  pixelArt: true,
  backgroundColor: 0x333333,
};

export default config;