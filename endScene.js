class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' })
    }
    create() {
        this.add.text(600, 420, `Nice try...`, {fill: '#FFFFFF', fontSize: '100px'}).setOrigin(0.5);
        this.add.text(600, 540, 'You made it to', {fill: '#FFFFFF', fontSize: '100px'}).setOrigin(0.5);
        this.add.text(600, 660, `round ${gameState.roundNum}.`, {fill: '#FFFFFF', fontSize: '100px'}).setOrigin(0.5);
        this.add.text(600, 800, 'Try Again?', {fill: '#FFFFFF', fontSize: '50px'}).setOrigin(0.5);
        this.input.on('pointerdown', () => {
            this.scene.stop('EndScene')
            this.scene.start('GameScene')
        })
    }
}