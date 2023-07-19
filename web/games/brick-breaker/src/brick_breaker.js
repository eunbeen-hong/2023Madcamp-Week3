class Paddle {
    constructor() {
        this.image = new Image();
        this.image.src = "../assets/brick_paddle.png";
        this.width = 100;
        this.height = 20;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 50;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    updatePosition(mouseX) {
        this.x = mouseX - this.width / 2;
        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width - this.width)
            this.x = canvas.width - this.width;
    }
}
class Ball {
    constructor() {
        this.image = new Image();
        this.image.src = "../assets/brick_ball.png";
        this.radius = 12;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }
    draw() {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            2 * this.radius,
            2 * this.radius
        );
    }
    move(xspeed, yspeed) {
        this.x += xspeed;
        this.y += yspeed;
    }
}
class Brick {
    constructor(x, y) {
        this.image = new Image();
        this.image.src = "../assets/brick_brick.png";
        this.x = x;
        this.y = y;
        this.width = 78;
        this.height = 18;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
class Heart {
    constructor() {
        this.image = new Image();
        this.image.src = "../assets/brick_heart.png";
        this.x = 50;
        this.y = canvas.height - 40;
        this.width = 35;
        this.height = 35;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function checkCrashPaddle(ball, paddle) {
    var rst = { dx: 1, dy: 1 };
    var inXCoordinate = ball.x >= paddle.x && ball.x <= paddle.x + paddle.width;
    var inYCoordinate =
        ball.y >= paddle.y && ball.y <= paddle.y + paddle.height;

    if (
        inXCoordinate &&
        ball.y + 2 * ball.radius >= paddle.y &&
        ball.y - 2 * ball.radius <= paddle.y + paddle.height &&
        yspeed > 0
    ) {
        rst.dy = -1;
        return rst;
    }
    if (
        inYCoordinate &&
        ball.x + 2 * ball.radius >= paddle.x &&
        ball.x - 2 * ball.radius <= paddle.x + paddle.width
    ) {
        rst.dx = -1;
        return rst;
    }
    return rst;
}

function checkCrashBrick(ball, brick) {
    var rst = { dx: 1, dy: 1 };
    var inXCoordinate =
        brick.x <= ball.x + 2 * ball.radius &&
        ball.x - 2 * ball.radius <= brick.x + brick.width;
    var inYCoordinate =
        brick.y <= ball.y + 2 * ball.radius &&
        ball.y - 2 * ball.radius <= brick.y + brick.height;

    if (
        inXCoordinate &&
        ball.y + 2 * ball.radius >= brick.y &&
        ball.y - 2 * ball.radius <= brick.y + brick.height
    ) {
        rst.dy = -1;
    }
    if (
        inYCoordinate &&
        ball.x + 2 * ball.radius >= brick.x &&
        ball.x - 2 * ball.radius <= brick.x + brick.width
    ) {
        rst.dx = -1;
    }
    return rst;
}

function removeBrick(bricks, b) {
    bricks.forEach((a, i, o) => {
        if (a.x == b.x && a.y == b.y) {
            o.splice(i, 1);
            score += 1;
            if (score > highscore_bb) {
                highscore_bb = score;
                localStorage.setItem("highscore_bb", highscore_bb);
            }
        }
    });
}

function levelLayout(level) {
    var level0 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    ];
    var level1 = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    var level2 = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    var levels = [level0, level1, level2];
    var levelLayout = levels[level];
    for (var i = 0; i < levelLayout.length; i++) {
        for (var j = 0; j < levelLayout[0].length; j++) {
            if (levelLayout[i][j] == 1) {
                var brick = new Brick(80 * j + 1, 20 * i + 11);
                bricks.push(brick);
            }
        }
    }
}

function startGame() {
    if (!gameStarted) {
        ball.x = paddle.x + paddle.width / 2 - 2 * ball.radius;
        ball.y = paddle.y - 2 * ball.radius;

        gameStarted = true;
        levelLayout(level);
        eachframe();
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
        "Highscore: " + highscore_bb,
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
        "Highscore: " + highscore_bb,
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

function drawHearts() {
    for (var i = 0; i < hearts; i++) {
        var h = new Heart();
        h.x = 10 + i * 40;
        h.draw();
    }
}

function drawGameObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffb668";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < bricks.length; i++) {
        var rst = checkCrashBrick(ball, bricks[i]);
        if (rst.dx == -1 || rst.dy == -1) {
            removeBrick(bricks, bricks[i]);
        }
        xspeed *= rst.dx;
        yspeed *= rst.dy;
    }
    bricks.forEach((a) => {
        a.draw();
    });

    var rst = checkCrashPaddle(ball, paddle);
    xspeed *= rst.dx;
    yspeed *= rst.dy;
    if (xspeed !== 0 && yspeed !== 0) {
        ball.move(xspeed + Math.random() * 4, yspeed);
    } else {
        ball.x = paddle.x + paddle.width / 2 - ball.radius;
        ball.y = paddle.y - 2 * ball.radius;
    }

    ball.draw();
    paddle.draw();
}

function eachframe() {
    if (bricks.length === 0) {
        if (level === 2) {
            // win
            // cancelAnimationFrame(animation);
            gameStarted = false;
            xspeed = 0;
            yspeed = 0;
            return;
        }
        // next level
        // cancelAnimationFrame(animation);
        gameStarted = false;
        level++;
        xspeed = 0;
        yspeed = 0;
        startGame();
        return;
    }
    if (ball.y + 2 * ball.radius > canvas.height) {
        // bottom: GAME OVER
        gameStarted = false;
        xspeed = 0;
        yspeed = 0;
        hearts--;
        if (hearts > 0) startGame();
        else {
            gameStarted = false;
            isGameOver = true;
            xspeed = 0;
            yspeed = 0;
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
            cancelAnimationFrame(animation);
        }
        return;
    }
    if (
        (ball.x - 2 * ball.radius < 0 && xspeed < 0) ||
        (ball.x + 2 * ball.radius >= canvas.width && xspeed > 0)
    ) {
        // side
        xspeed *= -1;
    }
    if (ball.y - ball.radius < 0 && yspeed < 0) {
        // top
        yspeed *= -1;
    }

    drawGameObjects();

    drawHearts();

    drawScore();

    animation = requestAnimationFrame(eachframe);
}

var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

var paddle = new Paddle();
var ball = new Ball();
var bricks = [];

var xspeed = 0;
var yspeed = 0;
var level = 0;
var hearts = 3;
var score = 0;
var highscore_bb = localStorage.getItem("highscore_bb");
if (highscore_bb === null) {
    highscore_bb = 0;
} else {
    highscore_bb = parseInt(highscore_bb);
}
var isGameOver = false;

var gameStarted = false;
// var animation;

canvas.addEventListener("mousemove", function (event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.offsetX || event.clientX - rect.left;
    paddle.updatePosition(mouseX);
});

canvas.addEventListener("click", function () {
    if (gameStarted && xspeed == 0 && yspeed == 0) {
        xspeed = 5;
        yspeed = -12;
    }
    if (isGameOver && !gameStarted) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts = 3;
        level = 0;
        score = 0;
        isGameOver = false;
        startGame();
    }
});

startGame();
