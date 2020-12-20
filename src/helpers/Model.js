/* eslint-disable no-underscore-dangle */
class Model {
  constructor() {
    this.soundOnPlay = true;
    this.musicOnPlay = true;
    this.bgMusicOnPlayingicPlaying = false;
    this._user = '';
    this._score = 0;
  }

  set musicOn(value) {
    this.musicOnPlay = value;
  }

  get musicOn() {
    return this.musicOnPlay;
  }

  set soundOn(value) {
    this.soundOnPlay = value;
  }

  get soundOn() {
    return this.soundOnPlay;
  }

  set bgMusicPlaying(value) {
    this.bgMusicOnPlayingicPlaying = value;
  }

  get bgMusicPlaying() {
    return this.bgMusicOnPlayingicPlaying;
  }

  set userName(value) {
    this._user = value;
  }

  get userName() {
    return this._user;
  }

  set score(value) {
    this._score = value;
  }

  get score() {
    return this._score;
  }

  resetScore() {
    this._score = 0;
  }
}

export default Model;