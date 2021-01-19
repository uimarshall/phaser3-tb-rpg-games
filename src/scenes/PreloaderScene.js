/* eslint-disable no-plusplus */
import Phaser from "phaser";

// The Scene that will load all the assets of the game
class PreloaderScene extends Phaser.Scene {
	constructor() {
		super("Preloader");
	}

	init() {
		this.URL = this.sys.game.URL;
		this.CONFIG = this.sys.game.CONFIG;
	}

	preload() {
		this.load.image("title", "assets/images/logo.png");
		this.load.image("background", "assets/images/forest.png");
		// load assets needed in our game
		this.load.image("blueButton1", "assets/images/blue_btn02.png");
		this.load.image("blueButton2", "assets/images/blue_btn03.png");
		this.load.image("box", "assets/images/grey_box.png");
		this.load.image("checkedBox", "assets/images/blue_boxCheckmark.png");
		this.load.audio("bgMusic", ["assets/audio/TownTheme.mp3"]);

		// map tiles
		this.load.image("tiles", "assets/map/cave.png");

		// map in json format
		this.load.tilemapTiledJSON("map", "assets/map/map.json");

		this.load.image("guard1", "assets/images/guard1.png");
		this.load.image("guard2", "assets/images/guard2.png");
		this.load.image("guard3", "assets/images/guard3.png");

		// our two characters
		this.load.spritesheet("player", "assets/images/player.png", {
			frameWidth: 32,
			frameHeight: 32,
		});

		this.load.spritesheet("enemy2", "assets/images/enemy.png", {
			frameWidth: 57,
			frameHeight: 88,
		});
		this.load.spritesheet("enemy1", "assets/images/enemy_1.png", {
			frameWidth: 120,
			frameHeight: 100,
		});
		this.load.spritesheet("mage1", "assets/images/mage_1.png", {
			frameWidth: 85,
			frameHeight: 94,
		});
		this.load.spritesheet("mage2", "assets/images/mage_2.png", {
			frameWidth: 122,
			frameHeight: 110,
		});
		this.load.spritesheet("mage3", "assets/images/mage_3.png", {
			frameWidth: 87,
			frameHeight: 110,
		});

		// display progress bar
		const progressBar = this.add.graphics();
		const progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(240, 270, 320, 50);

		const { width } = this.cameras.main;
		const { height } = this.cameras.main;
		const loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: "Loading...",
			style: {
				font: "20px monospace",
				fill: "#ffffff",
			},
		});
		loadingText.setOrigin(0.5, 0.5);

		const percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: "0%",
			style: {
				font: "18px monospace",
				fill: "#ffffff",
			},
		});
		percentText.setOrigin(0.5, 0.5);

		const assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: "",
			style: {
				font: "18px monospace",
				fill: "#ffffff",
			},
		});
		assetText.setOrigin(0.5, 0.5);

		// update progress bar
		this.load.on("progress", (value) => {
			percentText.setText(`${parseInt(value * 100, 10)}%`);
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(250, 280, 300 * value, 30);
		});

		// update file progress text
		this.load.on("fileprogress", (file) => {
			assetText.setText(`Loading asset: ${file.key}`);
		});

		// remove progress bar when complete
		this.load.on("complete", () => {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
		});

		// remove progress bar when complete
		this.load.on("complete", () => {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
			this.ready();
		});

		// this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
	}

	ready() {
		this.scene.start("UserScene");
	}
}

export default PreloaderScene;
