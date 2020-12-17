/* eslint-disable import/no-unresolved */
import 'jest-canvas-mock';
import Phaser from 'phaser';
import BattleScene from '../scenes/BattleScene';
import CreditsScene from '../scenes/CreditsScene';
import UIScene from '../scenes/UIScene';



function setup() {
  const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    dom: {
      createContainer: true,
    },
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true,
      },
    },
    scene: [
     
      BattleScene,
      CreditsScene,
      UIScene,
    ],
  };
  const game = new Phaser.Game(config);
  return game;
}

export default setup;