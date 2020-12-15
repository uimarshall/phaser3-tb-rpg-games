import PlayersHealthBar from './PlayersHealthBar';
import Unit from './Unit';


class Enemy extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame, type, hp, damage);
    this.type = type;
    this.maxHp = this.hp = hp;
    // this.damage = damage; // default damage
    this.healthBar = new PlayersHealthBar(scene, x - 40, y + 50);
  }
}

export default Enemy;