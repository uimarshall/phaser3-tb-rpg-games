
class Model {
  constructor() {
    this.soundOnPlay = true;
    this.musicOnPlay = true;
    this.bgMusicOnPlayingicPlaying = false;
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
}

export default Model;