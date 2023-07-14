import { checkCrashBrick } from "./physics";

export class Brick {
    constructor(game, position) {
        this.image = document.getElementById("brick_brick");
        this.game = game;
        this.position = position;
        this.width = 80;
        this.height = 20;
        this.broken = false;
    }
    draw() {
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
    update() {
        if (checkCrashBrick(this.game.ball, this)) {
            this.broken = true;
        }
    }
}

export class Ball {
    constructor(game) {
        this.game = game;

        this.image = document.getElementById("brick_ball");

        this.size = 16;
        this.reset();
        this.moving = false;
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size,
            this.size
        );
    }

    move() {
        if (this.moving) {
            this.position.x += this.speed.x;
            this.position.y += this.speed.y;

            if (this.collideWithWall(this.game, this)) {
                this.speed.x *= -1;
            }
            if (this.position.y <= 0) {
                this.speed.y *= -1;
            }
            if (this.collideWithBottom(this.game, this)) {
                this.game.lives--;
                this.reset();
                this.paddle.reset();
            }

            let speed = collideWithPaddle(this.game.paddle, this);
            if (speed !== -1) {
                this.speed.y *= -1;
                this.speed.x = speed;
            }
        }
    }
    reset() {
        this.position = {
            x: this.game.gameWidth / 2 - this.size / 2,
            y: this.game.gameHeight - this.size - 10,
        };
        this.speed = { x: 0, y: 0 };
        this.moving = false;
    }
    collideWithWall(game, ball) {
        return (
            ball.position.x + ball.size >= game.gameWidth ||
            ball.position.x <= 0
        );
    }
    collideWithBottom(game, ball) {
        return ball.position.y + ball.size >= game.gameHeight;
    }
    collideWithPaddle(paddle, ball) {
        let ballIsLeftOfPaddle =
            ball.position.x + ball.size < paddle.position.x;
        let ballIsRightOfPaddle =
            ball.position.x > paddle.position.x + paddle.width;
        let ballIsAbovePaddle = ball.position.y + ball.size < paddle.position.y;
        let ballIsBelowPaddle =
            ball.position.y > paddle.position.y + paddle.height;

        if (
            ballIsLeftOfPaddle ||
            ballIsRightOfPaddle ||
            ballIsAbovePaddle ||
            ballIsBelowPaddle
        ) {
            return -1;
        }

        return Math.floor(Math.abs(paddle.x - ball.x) / 10);
    }
}

export class Paddle {
    constructor(game) {
        this.image = document.getElementById("brick_paddle");
        this.width = 150;
        this.height = 30;

        this.maxSpeed = 10;
        this.speed = 0;

        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight - this.height - 10,
        };
    }
    reset() {
        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight - this.height - 10,
        };
    }
    draw() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
    updatePosition(mouseX) {
        this.x = mouseX - this.width / 2;
    }
}
