class Blocks {
    constructor(type, angle) {
        this.type = type;
        this.angle = angle;
        let blocks = [
            {
                shape: [
                    [
                        [-1, 0],
                        [0, 0],
                        [1, 0],
                        [2, 0],
                    ],
                    [
                        [0, -1],
                        [0, 0],
                        [0, 1],
                        [0, 2],
                    ],
                    [
                        [-1, 0],
                        [0, 0],
                        [1, 0],
                        [2, 0],
                    ],
                    [
                        [0, -1],
                        [0, 0],
                        [0, 1],
                        [0, 2],
                    ],
                ],
                color: "red",
                highlight: "white",
                shadow: "grey",
            },
            {
                shape: [
                    [
                        [0, 0],
                        [1, 0],
                        [0, 1],
                        [1, 1],
                    ],
                    [
                        [0, 0],
                        [1, 0],
                        [0, 1],
                        [1, 1],
                    ],
                    [
                        [0, 0],
                        [1, 0],
                        [0, 1],
                        [1, 1],
                    ],
                    [
                        [0, 0],
                        [1, 0],
                        [0, 1],
                        [1, 1],
                    ],
                ],
                color: "green",
                highlight: "white",
                shadow: "grey",
            },
            {
                shape: [
                    [
                        [0, 0],
                        [1, 0],
                        [-1, 1],
                        [0, 1],
                    ],
                    [
                        [-1, -1],
                        [-1, 0],
                        [0, 0],
                        [0, 1],
                    ],
                    [
                        [0, 0],
                        [1, 0],
                        [-1, 1],
                        [0, 1],
                    ],
                    [
                        [-1, -1],
                        [-1, 0],
                        [0, 0],
                        [0, 1],
                    ],
                ],
                color: "blue",
                highlight: "white",
                shadow: "grey",
            },
            {
                shape: [
                    [
                        [-1, 0],
                        [0, 0],
                        [0, 1],
                        [1, 1],
                    ],
                    [
                        [0, -1],
                        [-1, 0],
                        [0, 0],
                        [-1, 1],
                    ],
                    [
                        [-1, 0],
                        [0, 0],
                        [0, 1],
                        [1, 1],
                    ],
                    [
                        [0, -1],
                        [-1, 0],
                        [0, 0],
                        [-1, 1],
                    ],
                ],
                color: "orange",
                highlight: "white",
                shadow: "grey",
            },
            {
                shape: [
                    [
                        [-1, -1],
                        [-1, 0],
                        [0, 0],
                        [1, 0],
                    ],
                    [
                        [0, -1],
                        [1, -1],
                        [0, 0],
                        [0, 1],
                    ],
                    [
                        [-1, 0],
                        [0, 0],
                        [1, 0],
                        [1, 1],
                    ],
                    [
                        [0, -1],
                        [0, 0],
                        [-1, 1],
                        [0, 1],
                    ],
                ],
                color: "pink",
                highlight: "white",
                shadow: "grey",
            },
            {
                shape: [
                    [
                        [1, -1],
                        [-1, 0],
                        [0, 0],
                        [1, 0],
                    ],
                    [
                        [0, -1],
                        [0, 0],
                        [0, 1],
                        [1, 1],
                    ],
                    [
                        [-1, 0],
                        [0, 0],
                        [1, 0],
                        [-1, 1],
                    ],
                    [
                        [-1, -1],
                        [0, -1],
                        [0, 0],
                        [0, 1],
                    ],
                ],
                color: "purple",
                highlight: "white",
                shadow: "grey",
            },
            {
                shape: [
                    [
                        [0, -1],
                        [-1, 0],
                        [0, 0],
                        [1, 0],
                    ],
                    [
                        [0, -1],
                        [0, 0],
                        [1, 0],
                        [0, 1],
                    ],
                    [
                        [-1, 0],
                        [0, 0],
                        [1, 0],
                        [0, 1],
                    ],
                    [
                        [0, -1],
                        [-1, 0],
                        [0, 0],
                        [0, 1],
                    ],
                ],
                color: "yellow",
                highlight: "white",
                shadow: "grey",
            },
        ];
        this.x = Math.floor(horizontalCellCount / 2) - 1;
        this.y = -4;

        this.block = blocks[type];
    }
    checkBlockMove(x, y, angle) {
        for (var i = 0; i < this.block.shape[angle].length; i++) {
            var cellX = x + this.block.shape[angle][i][0];
            var cellY = y + this.block.shape[angle][i][1];
            if (
                cellX < 0 ||
                cellX >= horizontalCellCount ||
                cellY >= verticalCellCount ||
                gameView[cellY + 4][cellX].empty === false
            ) {
                return false;
            }
        }
        return true;
    }
    moveLeft() {
        if (this.checkBlockMove(this.x - 1, this.y, this.angle)) {
            this.x--;
            updateGameView();
        }
    }
    moveRight() {
        if (this.checkBlockMove(this.x + 1, this.y, this.angle)) {
            this.x++;
            updateGameView();
        }
    }
    rotate() {
        var newAngle = (this.angle + 1) % 4;
        if (this.checkBlockMove(this.x, this.y, newAngle)) {
            this.angle = newAngle;
            updateGameView();
        }
    }
    drop() {
        while (this.checkBlockMove(this.x, this.y + 1, this.angle)) {
            this.y++;
            updateGameView();
        }
        this.fixBlock();
        currentBlock = nextBlock;
        nextBlock = getNewBlock();
        updateGameView();
    }
    dropByOne() {
        if (this.checkBlockMove(this.x, this.y + 1, this.angle)) {
            this.y++;
            updateGameView();
        } else {
            console.log("dropped and fixed");
            this.fixBlock();
            checkLineFilled();
            if (checkGameOver()) {
                isGameOver = true;
                updateGameView();
            } else {
                currentBlock = nextBlock;
                nextBlock = getNewBlock();
                updateGameView();
            }
        }

        // setTimeout(() => {
        //     if (!isGameOver) {
        //         this.dropByOne();
        //     }
        // }, 1000);
    }
    fixBlock() {
        for (var i = 0; i < this.block.shape[this.angle].length; i++) {
            var cellX = this.x + this.block.shape[this.angle][i][0];
            var cellY = this.y + this.block.shape[this.angle][i][1];
            gameView[cellY + 4][cellX] = {
                empty: false,
                color: this.block.color,
                highlight: this.block.highlight,
                shadow: this.block.shadow,
            };
        }
    }
    checkLineFilled() {
        for (var i = 0; i < verticalCellCount; i++) {
            var filled = true;
            for (var j = 0; j < horizontalCellCount; j++) {
                if (gameView[i + 4][j].empty) {
                    filled = false;
                }
            }
            if (filled) {
                score++;
                if (score >= highscore) {
                    highscore = score;
                }

                for (var k = i; k > 0; k--) {
                    for (var l = 0; l < horizontalCellCount; l++) {
                        gameView[k + 4][l] = gameView[k + 4 - 1][l];
                    }
                }
            }
        }
    }
}

class Tetris {
    constructor() {
        this.stageWidth = canvas.width;
        this.stageHeight = canvas.height;
        this.cellWidth = this.stageWidth / horizontalCellCount;
        this.cellHeight = this.stageHeight / verticalCellCount;
        this.cellSize = Math.min(this.cellWidth, this.cellHeight);
    }

    drawBlock(block) {
        for (var i = 0; i < block.block.shape[block.angle].length; i++) {
            this.drawCell(
                block,
                (block.x + block.block.shape[block.angle][i][0]) *
                    this.cellSize,
                (block.y + block.block.shape[block.angle][i][1]) * this.cellSize
            );
        }
    }

    drawCell(block, x, y) {
        ctx.fillStyle = block.block.color;
        ctx.fillRect(x, y, this.cellSize, this.cellSize);

        ctx.strokeStyle = block.block.highlight;
        ctx.beginPath();
        ctx.moveTo(x, y + this.cellSize);
        ctx.lineTo(x, y);
        ctx.lineTo(x + this.cellSize, y);
        ctx.stroke();

        ctx.strokeStyle = block.block.shadow;
        ctx.beginPath();
        ctx.moveTo(x, y + this.cellSize);
        ctx.lineTo(x + this.cellSize, y + this.cellSize);
        ctx.lineTo(x + this.cellSize, y);
        ctx.stroke();
    }
}

function drawScore() {
    var textScale = canvas.width / 800;

    var textSize = 20 * textScale;
    ctx.font = textSize + "px Arial";
    ctx.textAlign = "right";

    // Draw the outline
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Highscore text
    ctx.strokeText(
        "Highscore: " + highscore,
        canvas.width - textScale * 10,
        canvas.height - textScale * 30
    );

    // Score text
    ctx.strokeText(
        "Score: " + score,
        canvas.width - textScale * 10,
        canvas.height - textScale * 10
    );

    // Draw the filled text
    ctx.fillStyle = "white";

    // Highscore text
    ctx.fillText(
        "Highscore: " + highscore,
        canvas.width - textScale * 10,
        canvas.height - textScale * 30
    );

    // Score text
    ctx.fillText(
        "Score: " + score,
        canvas.width - textScale * 10,
        canvas.height - textScale * 10
    );
}

function clearGame() {
    ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    ctx.fillStyle = "#ffb668";
    ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
}

function getNewBlock() {
    return new Blocks(
        Math.floor(Math.random() * 7),
        Math.floor(Math.random() * 4)
    );
}

function drawBlocks() {
    for (var i = 0; i < verticalCellCount; i++) {
        for (var j = 0; j < horizontalCellCount; j++) {
            var cell = gameView[i + 4][j];
            var x = j * tetris.cellSize;
            var y = i * tetris.cellSize;

            // Draw the cell
            ctx.fillStyle = cell.empty ? "black" : cell.color;
            ctx.fillRect(x, y, tetris.cellSize, tetris.cellSize);

            // Draw the cell borders
            ctx.strokeStyle = cell.highlight;
            ctx.beginPath();
            ctx.moveTo(x, y + tetris.cellSize);
            ctx.lineTo(x, y);
            ctx.lineTo(x + tetris.cellSize, y);
            ctx.stroke();

            ctx.strokeStyle = cell.shadow;
            ctx.beginPath();
            ctx.moveTo(x, y + tetris.cellSize);
            ctx.lineTo(x + tetris.cellSize, y + tetris.cellSize);
            ctx.lineTo(x + tetris.cellSize, y);
            ctx.stroke();
        }
    }
}

function updateGameView() {
    clearGame();
    drawBlocks();
    drawScore();

    tetris.drawBlock(currentBlock);
}

function updateGame() {
    if (
        !currentBlock.checkBlockMove(
            currentBlock.x,
            currentBlock.y + 1,
            currentBlock.angle
        )
    ) {
        currentBlock.fixBlock();
        checkLineFilled();
        if (checkGameOver()) {
            isGameOver = true;
            updateGameView();
            return;
        } else {
            currentBlock = nextBlock;
            nextBlock = getNewBlock();
            updateGameView();
        }
    } else {
        currentBlock.dropByOne();
        updateGameView();
    }

    if (!isGameOver) {
        setTimeout(updateGame, 1000);
    }
}

function checkLineFilled() {
    for (var i = verticalCellCount - 1; i >= 0; i--) {
        var filled = true;
        for (var j = 0; j < horizontalCellCount; j++) {
            if (gameView[i + 4][j].empty) {
                filled = false;
                break;
            }
        }
        if (filled) {
            score++;
            if (score >= highscore) {
                highscore = score;
                localStorage.setItem("highscore", highscore);
            }
            moveLinesDown(i);
            i++; // Recheck the current row after moving down
        }
    }
}

function moveLinesDown(row) {
    for (var i = row; i > 0; i--) {
        gameView[i + 4] = gameView[i + 4 - 1].slice(); // Copy the row using slice
    }

    // Clear the top row
    gameView[4] = new Array(horizontalCellCount).fill({
        empty: true,
        color: "black",
        highlight: "gray",
        shadow: "white",
    });
}

function checkGameOver() {
    var block = currentBlock.block;
    var angle = currentBlock.angle;

    for (var i = 0; i < block.shape[angle].length; i++) {
        var cellX = currentBlock.x + block.shape[angle][i][0];
        var cellY = currentBlock.y + block.shape[angle][i][1];

        if (cellY === 0) {
            return true;
        }
    }

    // Additional condition to check the top cell
    if (currentBlock.y <= 0) {
        return true;
    }

    return false;
}

function startGame() {
    isGameOver = false;
    score = 0;
    gameView = initializeGameView(); // Reset the game view
    currentBlock = getNewBlock();
    nextBlock = getNewBlock();
    updateGameView();
    eachframe();
}
function initializeGameView() {
    var view = new Array(verticalCellCount + 4);
    for (var i = 0; i < view.length; i++) {
        view[i] = new Array(horizontalCellCount);
        for (var j = 0; j < view[i].length; j++) {
            view[i][j] = {
                empty: true,
                color: "black",
                highlight: "gray",
                shadow: "white",
            };
        }
    }
    return view;
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        currentBlock.moveLeft();
    } else if (event.key === "ArrowRight") {
        currentBlock.moveRight();
    } else if (event.key === "ArrowUp") {
        currentBlock.rotate();
    } else if (event.key === "ArrowDown") {
        currentBlock.drop();
    }
});

function eachframe() {
    if (isGameOver) {
        gameStarted = false;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        ctx.fillText(
            "Click to restart",
            canvas.width / 2,
            canvas.height / 2 + 40
        );
        return;
    }

    updateGame();
    // requestAnimationFrame(eachframe);
    setTimeout(eachframe, 1000);
}

var canvas = document.getElementById("canvas4");
var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

var horizontalCellCount = 10;
var verticalCellCount = 20;

var tetris = new Tetris();
var currentBlock = getNewBlock();
var nextBlock = getNewBlock();

var isGameOver = false;
var score = 0;
var highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscore = 0;
} else {
    highscore = parseInt(highscore);
}

var gameView = initializeGameView();

canvas.addEventListener("click", function () {
    if (isGameOver) {
        startGame();
    }
});

startGame();
