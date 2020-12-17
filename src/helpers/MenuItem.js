import Phaser from 'phaser';

class MenuItem extends Phaser.GameObjects.Text {
  constructor(x, y, text, scene) {
    super(this, scene, x, y, text, {
      color: '#ffffff', align: 'left', fontSize: 15, fontFamily: 'Georgia',
    });
  }

  select() {
    this.setColor('#f8ff38');
  }

  deselect() {
    this.setColor('#ffffff');
  }

  // when the associated enemy or player unit is killed
  unitKilled() {
    this.active = false;
    this.visible = false;
  }
}

export default MenuItem;