
class GameScene extends Phaser.Scene {
    constructor(){
        super({ key: 'GameScene' });
    }

    preload() {

    }
    create() {
        // Round Number Text
        let roundDisplay = this.add.text(600, 150, `Round: ${gameState.roundNum}`, {fill: '#FFFFFF', fontSize: '75px'}).setOrigin(0.5);
        // These are the four buttons and their colors
        const blueCode = 0x0072bc;
        const redCode = 0xed1c24;
        const greenCode = 0x39b54a;
        const yellowCode = 0xfff200;

        gameState.blueCircle = this.add.circle(600, 400, 100, blueCode);
        gameState.redCircle = this.add.circle(300, 700, 100, redCode);
        gameState.greenCircle = this.add.circle(600, 1000, 100, greenCode);
        gameState.yellowCircle = this.add.circle(900, 700, 100, yellowCode);

        gameState.blueCircle.default = blueCode;
        gameState.blueCircle.lit = 0x448ccb;
        gameState.blueCircle.press = 0x004a80;
        gameState.redCircle.default = redCode;
        gameState.redCircle.lit = 0xf26c4f;
        gameState.redCircle.press = 0x9e0b0f;
        gameState.greenCircle.default = greenCode;
        gameState.greenCircle.lit = 0x7cc576;
        gameState.greenCircle.press = 0x197b30;
        gameState.yellowCircle.default = yellowCode;
        gameState.yellowCircle.lit = 0xfff568;
        gameState.yellowCircle.press = 0xaba000;

        gameState.blueCircle.colorName = 'blue'
        gameState.redCircle.colorName = 'red'
        gameState.greenCircle.colorName = 'green'
        gameState.yellowCircle.colorName = 'yellow'

        gameState.circles = [gameState.blueCircle, gameState.redCircle, gameState.greenCircle, gameState.yellowCircle]
        for (let circle of gameState.circles) {
            circle.strokeColor = 0x000000;
            circle.isStroked = true;
            circle.lineWidth = 15;
        }
    
        // Generates the color list and pushes to the global order (that sounds nefarious)
        function addRandomColor() {
            let colors = ['blue', 'red', 'green', 'yellow'];
            gameState.order.push(colors[Math.floor(Math.random() * 4)]);
        }
        // New Game function take 1
        function newGame() {
            gameState.order = [];
            addRandomColor();
            gameState.expectedColor = gameState.order[0];
            gameState.roundNum = 1;
            gameState.choiceNum = 1;
            displayOrder();
        }
        function displayOrder() {
            // Controls how long the display cycle will take (in ms)
            let lightTime = 800
            let delay = 200
            let comboTime = lightTime + delay
            // Prevents the user from interrupting the display sequence
            gameState.displayState = true;
            setTimeout(function(){
                gameState.displayState = false;
            }, comboTime * gameState.order.length);
            function lightUp (color) {
                // Identifies the circle to light
                let ding
                if (color === 'blue') {
                    ding = gameState.blueCircle;
                } else if (color === 'red') {
                    ding = gameState.redCircle;
                } else if (color === 'green') {
                    ding = gameState.greenCircle;
                } else if (color === 'yellow') {
                    ding = gameState.yellowCircle;
                };
                // Makes the initial color change
                ding.fillColor = ding.lit;
                ding.strokeColor = 0xffffff;
                // Updates the round text
                roundDisplay.setText(`Round: ${gameState.roundNum}`)
            }
            function lightDown (color) {
                let ding
                if (color === 'blue') {
                    ding = gameState.blueCircle;
                } else if (color === 'red') {
                    ding = gameState.redCircle;
                } else if (color === 'green') {
                    ding = gameState.greenCircle;
                } else if (color === 'yellow') {
                    ding = gameState.yellowCircle;
                };
                // Reverts to original colors
                ding.fillColor = ding.default;
                ding.strokeColor = 0x000000;
            }
            function lightSequence () {
                lightUp(gameState.order[index])
                setTimeout(function(){
                    lightDown(gameState.order[index]);
                    index++
                }, lightTime);

                if (index < (gameState.order.length - 1)) {
                    setTimeout(lightSequence, comboTime)
                }
            }   
            let index = 0;
            lightSequence();
        }
        function correct() {
            if (gameState.choiceNum === gameState.roundNum) {
                addRandomColor();
                gameState.expectedColor = gameState.order[0];
                gameState.roundNum ++;
                gameState.choiceNum = 1;
                displayOrder();
            } else {
                gameState.choiceNum ++;
                gameState.expectedColor = gameState.order[gameState.choiceNum - 1];
            }  
        }
        // The incorrect function will switch the scene over to the endScene
        function incorrect() {
            game.scene.stop('GameScene');
            game.scene.start('EndScene');
        }

        // This block will compare the selection to the correct answer
        for (let circle of gameState.circles) {
        circle.on('pointerup', function() {
            if (this.colorName === gameState.expectedColor) {
                correct();
            } else if (this.colorName !== gameState.expectedColor) {
                incorrect();
            };
        });
        };
        newGame();
    };
    update() {
        // Holds the code that makes buttons change color
        for (let circle of gameState.circles) {
            circle.on('pointerdown', function() {
                this.fillColor = this.press;
                // playAudio color.press
            });
            circle.on('pointerup', function() {this.fillColor = this.default;});
            circle.on('pointerout', function() {this.fillColor = this.default;});
        }
        // This code turns the circles into working buttons when not displaying
        if (gameState.displayState === false) {
            for (let circle of gameState.circles) {
                circle.setInteractive();
            }
        };
        if (gameState.displayState === true) {
            for (let circle of gameState.circles) {
                circle.disableInteractive(false);
            }
        };
    };
    
}
