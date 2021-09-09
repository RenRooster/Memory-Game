// This is the space for globally scoped variables
const gameState = {};
gameState.displayState = false
gameState.circles = null
gameState.choiceNum = null
gameState.roundNum = 1
// This order will be referenced for expectedColor
gameState.order = null
// TBR
gameState.expectedColor = '';
// Contains the metainformation of the game
const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 1200,
    backgroundColor: 0x313748,
    scene: 
        [StartScene, GameScene, EndScene]
    
}

const game = new Phaser.Game(config);
