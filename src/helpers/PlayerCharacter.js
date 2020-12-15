import PlayersHealthBar from './PlayersHealthBar';
import Unit from './Unit';



class PlayerCharacter extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame, type, hp, damage);
    // flip the image so I don't have to edit it manually
    this.flipX = true;
    this.healthBar = new PlayersHealthBar(scene, x - 45, y + 30);

    this.setScale(1);
   
  }
}

export default PlayerCharacter;