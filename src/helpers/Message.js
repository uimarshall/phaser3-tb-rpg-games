import Phaser from "phaser";

class Message extends Phaser.GameObjects.Container {
	constructor(scene, events) {
		super(scene, 160, 30);
		const graphics = this.scene.add.graphics();
		this.add(graphics);
		graphics.lineStyle(1, 0xffffff, 0.8);
		graphics.fillStyle(0x031f4c, 0.3);
		graphics.strokeRect(80, 100, 320, 190);
		graphics.fillRect(80, 100, 320, 190);
		this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", {
			color: "#f2ea0e",
			align: "center",
			fontSize: 16,
			wordWrap: { width: 160, useAdvancedWrap: true },
		});
		this.add(this.text);
		this.text.setOrigin(0.5);
		events.on("Message", this.showMessage, this);
		this.visible = false;
	}

	showMessage(text) {
		this.text.setText(text);
		this.visible = true;
		if (this.hideEvent) {
			this.hideEvent.remove(false);
		}
		this.hideEvent = this.scene.time.addEvent({
			delay: 2000,
			callback: this.hideMessage,
			callbackScope: this,
		});
	}

	hideMessage() {
		this.hideEvent = null;
		this.visible = false;
	}
}

export default Message;
