import "jest-canvas-mock";
import Phaser from "phaser";

import config from "../src/app/config";
import Model from "../src/helpers/Model";

class Game extends Phaser.Game {
	constructor() {
		super(config);
		const model = new Model();
		this.globals = { model, bgMusic: null };
		this.scene.start("BootScene");
	}
}

export default Game;
