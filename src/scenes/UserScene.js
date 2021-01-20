/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
/* eslint-disable no-tabs */
import Phaser from "phaser";
import config from "../app/config";

export default class UserScene extends Phaser.Scene {
	constructor() {
		super("UserScene");
	}

	init() {
		this.scale.fullscreenTarget = document.getElementById(config.parent);
	}

	create() {
		this.back = this.add.image(400, 300, "background");
		this.add.image(400, 100, "title");

		// try to add the story
		const story = [
			"Your league of spies just received an intel that the palace of Condor is about to be attacked by witches of Endor in 3 weeks. You have to be there to protect Condor.",

			"The people of Condor are relying on you to save them. Do not fail your mission.",
		];

		const graphics = this.make.graphics();

		graphics.fillRect(70, 160, 665, 270);
		const mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
		const text = this.add.text(70, 160, story, {
			color: "white",
			fontSize: "18px ",
			wordWrap: { width: 665 },
			align: "center",
		});
		text.setMask(mask);

		// end of story

		this.add.text(270, 430, "Please enter your name", {
			color: "white",
			fontSize: "18px ",
		});
		this.add.text(700, 560, "v.1.0.7", {
			color: "#fff",
			fontSize: "12px",
		});

		const input = this.add.dom(400, 478, "input", {
			type: "text",
			name: "nameField",
			fontSize: "32px",
		});

		const style =
			"background: url(assets/images/btn_sm.png); width: 490px; height: 77px; border: none; font: 32px Georgia; color: #fff;";
		const btn = this.add.dom(390, 550, "button", style, "Play Now");
		btn.addListener("click");

		btn.on("click", () => {
			if (input.node.value) {
				this.model = this.sys.game.globals.model;
				this.model.userName = input.node.value;
				this.scene.start("Title");
			}
		});
	}
}
