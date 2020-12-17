import Phaser from 'phaser';

import { putScore } from "../API/leaderBoard";
import config from "../app/config";



class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init() {
    this.scale.fullscreenTarget = document.getElementById(config.parent);
    this.model = this.sys.game.globals.model;
  }

  create() {
    this.back = this.add.image(400, 300, 'background');
    this.add.image(400, 100, 'title');

    this.add.text(400, 200, 'Game Over', {
      color: 'white',
      fontSize: '32px ',
      fontFamily: 'Georgia',
    }).setOrigin(0.5, 0.5);

    this.add.text(400, 300, `Score: ${this.sys.game.globals.model.score}`, {
      color: 'white',
      fontSize: '32px ',
    }).setOrigin(0.5, 0.5);

    putScore(this.model.userName, this.model.score);

    const style = 'background: url(src/assets/images/btn_sm.png); width: 490px; height: 77px; border: none; font: 32px Georgia; color: #fff';
    const btn = this.add.dom(390, 400, 'button', style, 'Menu');
    btn.addListener('click');

    btn.on('click', () => {
      this.model.resetScore();
      this.scene.start('Title');
    });
  }
}

export default GameOverScene