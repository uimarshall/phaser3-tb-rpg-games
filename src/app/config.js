/* eslint-disable import/no-cycle */
import Phaser from 'phaser';
import BattleScene from '../scenes/BattleScene';
import BootScene from '../scenes/BootScene';
import CreditsScene from '../scenes/CreditsScene';
import GameScene from '../scenes/GameScene';
import OptionsScene from '../scenes/OptionsScene';
import PreloaderScene from '../scenes/PreloaderScene';
import TitleScene from '../scenes/TitleScene';
import UIScene from '../scenes/UIScene';
import UserScene from '../scenes/UserScene';


// Scenes
const scenes = [BootScene, PreloaderScene, GameScene, TitleScene, OptionsScene, CreditsScene, BattleScene,UserScene,UIScene];

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-app',
  title: 'Treasure of condor',
  url: '',
  width: 800,
  height: 600,
   dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: scenes,
  zoom: 2,
  pixelArt: true,
  backgroundColor: 0x333333,
};

export default config;