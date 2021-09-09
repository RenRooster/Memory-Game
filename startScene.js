class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}
    create() {
        this.add.text(600, 600, 'Click to\n Start!', {fill: '#FFFFFF', fontSize: '200px'}).setOrigin(0.5);
        this.input.on('pointerdown', () => {
			this.scene.stop('StartScene')
			this.scene.start('GameScene')
		})
    }
}
