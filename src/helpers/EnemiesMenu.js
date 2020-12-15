
import Menu from './Menu';

class EnemiesMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene);
  }

  confirm() {
    // do something when the player selects an action
    this.scene.events.emit('Enemy', this.menuItemIndex);
  }
}


export default EnemiesMenu;