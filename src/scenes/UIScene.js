import Phaser from "phaser";
import ActionsMenu from "../helpers/ActionsMenu";
import EnemiesMenu from "../helpers/EnemiesMenu";
import HeroesMenu from "../helpers/HeroesMenu";
import Message from "../helpers/Message";

class UIScene extends Phaser.Scene {
	constructor() {
		super("UIScene");
	}

	create() {
		// draw some background for the menu
		this.graphics = this.add.graphics();
		this.graphics.lineStyle(1, 0xffffff);
		this.graphics.fillStyle(0xff00f2, 1);
		this.graphics.strokeRect(2, 398, 282, 200);
		this.graphics.fillRect(2, 398, 282, 200);
		this.graphics.strokeRect(290, 398, 212, 200);
		this.graphics.fillRect(290, 398, 212, 200);
		this.graphics.strokeRect(508, 398, 290, 200);
		this.graphics.fillRect(508, 398, 290, 200);

		// basic container to hold all menus
		this.menus = this.add.container();

		this.enemiesMenu = new EnemiesMenu(32, 405, this);
		this.actionsMenu = new ActionsMenu(350, 405, this);
		this.heroesMenu = new HeroesMenu(540, 405, this);
		// the currently selected menu
		this.currentMenu = this.actionsMenu;

		// add menus to the container
		this.menus.add(this.heroesMenu);
		this.menus.add(this.actionsMenu);
		this.menus.add(this.enemiesMenu);

		this.battleScene = this.scene.get("BattleScene");

		// listen for keyboard events
		this.input.keyboard.on("keydown", this.onKeyInput, this);

		// when its player cunit turn to move
		this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

		// when the action on the menu is selected
		// for now we have only one action so we dont send and action id
		this.events.on("SelectedAction", this.onSelectedAction, this);

		// an enemy is selected
		this.events.on("Enemy", this.onEnemy, this);

		// when the scene receives wake event
		this.sys.events.on("wake", this.createMenu, this);

		// the message describing the current action
		this.message = new Message(this, this.battleScene.events);
		this.add.existing(this.message);

		this.createMenu();
	}

	createMenu() {
		// map hero menu items to heroes
		this.remapHeroes();
		// map enemies menu items to enemies
		this.remapEnemies();
		// first move
		this.battleScene.nextTurn();
	}

	onEnemy(index) {
		this.heroesMenu.deselect();
		this.actionsMenu.deselect();
		this.enemiesMenu.deselect();
		this.currentMenu = null;
		this.battleScene.receivePlayerSelection("attack", index);
	}

	onSelectedAction() {
		this.currentMenu = this.enemiesMenu;
		this.enemiesMenu.select(0);
	}

	onKeyInput(event) {
		if (this.currentMenu && this.currentMenu.selected) {
			if (event.code === "ArrowUp") {
				this.currentMenu.moveSelectionUp();
			} else if (event.code === "ArrowDown") {
				this.currentMenu.moveSelectionDown();
			} else if (event.code === "Space" || event.code === "ArrowLeft") {
				this.currentMenu.confirm();
			}
		}
	}

	onPlayerSelect(id) {
		this.heroesMenu.select(id);
		this.actionsMenu.select(0);
		this.currentMenu = this.actionsMenu;
	}

	remapHeroes() {
		const { heroes } = this.battleScene;
		this.heroesMenu.remap(heroes);
	}

	remapEnemies() {
		const { enemies } = this.battleScene;
		this.enemiesMenu.remap(enemies);
	}
}

export default UIScene;
