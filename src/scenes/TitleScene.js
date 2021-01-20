/* eslint-disable import/no-cycle */
import Phaser from 'phaser';
import config from '../app/config';
import Button from '../helpers/Button';


class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }


  create() {
    this.back = this.add.image(400, 300, 'background');
    this.add.image(400, 100, 'title');
    const user = this.sys.game.globals.model.userName;
    this.add.text(config.width / 2, 20, `Welcome ${user}`).setOrigin(0.5, 0.5);

    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    // LeaderBoard
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 200,
      'blueButton1',
      'blueButton2',
      'HighScore',
      'HighScore',
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}

export default TitleScene;
