import Phaser from 'phaser';
import BootScene from '../scenes/BootScene';
import CreditsScene from '../scenes/CreditsScene';
import GameScene from '../scenes/GameScene';
import OptionsScene from '../scenes/OptionsScene';
import PreloaderScene from '../scenes/PreloaderScene';
import TitleScene from '../scenes/TitleScene';


// Scenes
const scenes = [BootScene, PreloaderScene, GameScene, TitleScene, OptionsScene, CreditsScene];

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-app',
  title: 'Treasure of condor',
  url: '',
  width: 800,
  height: 600,
  //  dom: {
  //   createContainer: true,
  // },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: scenes,
  zoom: 2,
  pixelArt: true,
  backgroundColor: 0x333333,
};

export default config;