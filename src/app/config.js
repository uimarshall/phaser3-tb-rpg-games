/* eslint-disable import/no-cycle */
import Phaser from 'phaser';
import BattleScene from '../scenes/BattleScene';
import BootScene from '../scenes/BootScene';
import CreditsScene from '../scenes/CreditsScene';
import GameOverScene from '../scenes/GameOverScene';
import GameScene from '../scenes/GameScene';
import LeaderBoardScene from '../scenes/LeaderBoardScene';
import OptionsScene from '../scenes/OptionsScene';
import PreloaderScene from '../scenes/PreloaderScene';
import TitleScene from '../scenes/TitleScene';
import UIScene from '../scenes/UIScene';
import UserScene from '../scenes/UserScene';
import VictoryScene from '../scenes/VictoryScene';

// Scenes
const scenes = [
  BootScene,
  PreloaderScene,
  GameScene,
  UIScene,
  TitleScene,
  OptionsScene,
  CreditsScene,
  BattleScene,
  UserScene,
  LeaderBoardScene,
  VictoryScene,
  GameOverScene,
];

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
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: scenes,
  pixelArt: true,
  backgroundColor: 0x333333,
};

export default config;
