
import Menu from './Menu';

class ActionsMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.addMenuItem('Attack');
  }

  confirm() {
    // do something when the player selects an action
    this.scene.events.emit('SelectEnemies');
  }
}


export default ActionsMenu;