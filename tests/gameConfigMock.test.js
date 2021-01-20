/* eslint-disable no-undef */

/* eslint-disable import/no-unresolved */
import "jest-canvas-mock";
import Phaser from "phaser";
import BattleScene from "../src/scenes/BattleScene";
import CreditsScene from "../src/scenes/CreditsScene";
import UIScene from "../src/scenes/UIScene";
module.exports = {};

function setup() {
	const config = {
		type: Phaser.AUTO,
		parent: "phaser-example",
		dom: {
			createContainer: true,
		},
		width: 800,
		height: 600,
		pixelArt: true,
		physics: {
			default: "arcade",
			arcade: {
				gravity: { y: 10 },
				debug: true,
			},
		},
		scene: [BattleScene, CreditsScene, UIScene],
	};
	const game = new Phaser.Game(config);
	return game;
}

describe("test the game creation configuration", () => {
	test("create a new game object", () => {
		expect(typeof setup()).toBe("object");
	});

	test("create all the provided scenes", () => {
		expect(typeof setup().scene.scenes.length).toBe("number");
	});
});
