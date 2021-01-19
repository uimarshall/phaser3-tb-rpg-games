/* eslint-disable import/no-cycle */
/* eslint-disable no-tabs */
import Phaser from "phaser";
import { putScore } from "../API/leaderBoard";
import config from "../app/config";

class VictoryScene extends Phaser.Scene {
	constructor() {
		super("Victory");
	}

	init() {
		this.scale.fullscreenTarget = document.getElementById(config.parent);
		this.model = this.sys.game.globals.model;
	}

	create() {
		this.back = this.add.image(400, 300, "background");
		this.add.image(400, 100, "title");

		this.add
			.text(400, 200, "Victory!", {
				color: "white",
				fontSize: "32px ",
				fontFamily: "Georgia",
			})
			.setOrigin(0.5, 0.5);

		const victory =
			"Congratulations the reaper. You are \nthe saviour Condor!.";
		this.add
			.text(400, 300, victory, {
				color: "white",
				fontSize: "24px ",
			})
			.setOrigin(0.5, 0.5);

		this.add
			.text(400, 400, `Score: ${this.model.score}`, {
				color: "white",
				fontSize: "32px ",
			})
			.setOrigin(0.5, 0.5);

		putScore(this.model.userName, this.model.score);
		const style =
			"background: url(src/assets/images/btn_sm.png); width: 490px; height: 77px; border: none; font: 32px Georgia; color: #fff";
		const btn = this.add.dom(390, 490, "button", style, "Menu");
		btn.addListener("click");

		btn.on("click", () => {
			this.model.resetScore();
			this.scene.start("Title");
		});
	}
}
export default VictoryScene;
