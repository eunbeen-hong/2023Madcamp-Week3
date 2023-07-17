class Paddle1 {
    constructor() {
        this.image = new Image();
        this.image.src = "test-game/assets/brick_paddle.png";
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
    }
}
class Ball1 {
    constructor() {
        this.image = new Image();
        this.image.src = "test-game/assets/brick_ball.png";
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
class Brick1 {
    constructor(x, y) {
        this.image = new Image();
        this.image.src = "test-game/assets/brick_brick.png";
        this.x = x;
        this.y = y;
        this.width = 78;
        this.height = 18;
        this.broken = false;
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
                var brick = new Brick1(80 * j + 1, 20 * i + 11);
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
    }
    if (ball.y + 2 * ball.radius > canvas.height) {
        // bottom: GAME OVER
        gameStarted = false;
        xspeed = 0;
        yspeed = 0;
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

    animation = requestAnimationFrame(eachframe);
}

var canvas = document.getElementById("canvas3");
var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

var paddle = new Paddle1();
var ball = new Ball();
var bricks = [];

var xspeed = 0;
var yspeed = 0;
var level = 0;

var gameStarted = false;
// var animation;

canvas.addEventListener("mousemove", function (event) {
    var mouseX = event.clientX - canvas.offsetLeft;
    paddle.updatePosition(mouseX);
});

canvas.addEventListener("click", function () {
    if (gameStarted && xspeed == 0 && yspeed == 0) {
        xspeed = 5;
        yspeed = -9;
    }
});

startGame();
