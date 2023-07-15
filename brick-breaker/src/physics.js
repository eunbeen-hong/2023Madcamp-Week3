var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = canvas.width * 0.6;
    // ctx.fillStyle = "white";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    // Additional code to handle canvas redraw or repositioning, if necessary
}

function drawBackground() {
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sky (top 60%)
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);

    // Draw ground (bottom 40%)
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
}

// Initial canvas size setup
resizeCanvas();

// Event listener for window resize
window.addEventListener("resize", function () {
    resizeCanvas();
});

// Additional drawing and rendering operations..

// var Neopjuk = {
//   x: 10,
//   y: 270,
//   width: canvas.height * 0.25,
//   height: canvas.height * 0.25,
//   maxJumps: 2, // Maximum number of jumps allowed
//   jumpCount: 0, // Number of jumps made
//   jumpSpeed: 5,
//   gravity: 0.15,
//   velocity: 0,
//   draw() {
//     ctx.fillStyle = "green";
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//     ctx.drawImage(img_neopjuk, this.x, this.y, this.width, this.height);
//   },
//   jump() {
//     if (this.jumpCount < this.maxJumps && !isJumpKeyPressed) {
//       this.velocity = -this.jumpSpeed;
//       this.jumpCount++;
//       isJumpKeyPressed = true;
//     }
//   },
//   update() {
//     this.y += this.velocity;
//     this.velocity += this.gravity;

//     if (this.y > 200) {
//       this.y = 200;
//       this.velocity = 0;
//       this.jumpCount = 0; // Reset jump count
//       isJumpKeyPressed = false;
//     }
//   }
// };

class Neopjuk {
    constructor() {
        this.x = 10;
        this.y = canvas.height * 0.45;
        this.width = canvas.height * 0.25;
        this.height = canvas.height * 0.25;
        this.maxJumps = 2; // Maximum number of jumps allowed
        this.jumpCount = 0; // Number of jumps made
        this.jumpSpeed = 5;
        this.gravity = 0.15;
        this.velocity = 0;
        this.isDownArrowPressed = false; // 아래 방향키 눌림 여부
    }
    draw() {
        if (this.isDownArrowPressed) {
            ctx.drawImage(
                img_neopjuk2,
                this.x,
                this.y,
                this.width,
                this.height
            );
        } else {
            ctx.drawImage(img_neopjuk, this.x, this.y, this.width, this.height);
        }
        //   ctx.fillStyle = "green";
        //   ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img_neopjuk, this.x, this.y, this.width, this.height);
    }
    jump() {
        if (this.jumpCount < this.maxJumps && !isJumpKeyPressed) {
            this.velocity = -this.jumpSpeed;
            this.jumpCount++;
            isJumpKeyPressed = true;
        }
    }
    update() {
        this.y += this.velocity;
        this.velocity += this.gravity;

        if (this.y > canvas.height * 0.45) {
            this.y = canvas.height * 0.45;
            this.velocity = 0;
            this.jumpCount = 0; // Reset jump count
            isJumpKeyPressed = false;
        }
        if (this.isDownArrowPressed) {
            this.y = canvas.height * 0.45 + canvas.height * 0.25 * 0.3;
            this.width = canvas.height * 0.25 * 0.7;
            this.height = canvas.height * 0.25 * 0.7;
        } else {
            this.y = canvas.height * 0.45;
            this.width = canvas.height * 0.25;
            this.height = canvas.height * 0.25;
        }
    }
}

var fps = 60; // 변경할 fps 값 (예: 30)

var img_neopjuk = new Image();
var img_neopjuk2 = new Image();
var img_kkariyong = new Image();
var img_computer = new Image();
var img_goose = new Image();
img_neopjuk.src = "neop.png";
img_kkariyong.src = "longobs.png";
img_computer.src = "shortobs.png";
img_goose.src = "goose.png";
img_neopjuk2.src = "neopjuk2.png";

class Tree {
    constructor() {
        this.x = canvas.width;
        (this.y = canvas.height * 0.45 - canvas.height * 0.25 * 0.1),
            (this.width = canvas.height * 0.25 * 0.2);
        this.height = canvas.height * 0.25 * 1.1;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img_kkariyong, this.x, this.y, this.width, this.height);
    }
}

class Computer {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height * 0.45 + canvas.height * 0.25 * 0.6;
        this.width = canvas.height * 0.25 * 0.4;
        this.height = canvas.height * 0.25 * 0.4;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img_computer, this.x, this.y, this.width, this.height);
    }
}

class Goose {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height * 0.5 - canvas.height * 0.25 * 0.7;
        this.width = canvas.height * 0.25 * 1;
        this.height = canvas.height * 0.25 * 0.7;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img_goose, this.x, this.y, this.width, this.height);
    }
}

var timer = 0;
var manytrees = [];
var manycomputers = [];
var manygeese = [];
var animation;
var treeSpeed = 3; // 장애물의 이동 속도
var neopjuk = new Neopjuk();

function eachframe() {
    animation = requestAnimationFrame(eachframe);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    //   ctx.fillStyle = "gray";
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (timer % 200 === 0) {
        var randomValue = Math.random();
        if (randomValue < 0.33) {
            var tree = new Tree();
            manytrees.push(tree);
        } else if (0.33 <= randomValue || randomValue < 0.67) {
            var goose = new Goose();
            manygeese.push(goose);
            // var computer = new Computer();
            // manycomputers.push(computer);
        } else {
            var computer = new Computer();
            manycomputers.push(computer);
        }
    }

    manytrees.forEach((a, i, o) => {
        if (a.x < -a.width) {
            o.splice(i, 1);
        }
        a.x -= treeSpeed;

        checkcrash(neopjuk, a);

        a.draw();
    });

    manycomputers.forEach((a, i, o) => {
        if (a.x < -a.width) {
            o.splice(i, 1);
        }
        a.x -= treeSpeed;

        checkcrash2(Neopjuk, a);

        a.draw();
    });

    manygeese.forEach((a, i, o) => {
        if (a.x < -a.width) {
            o.splice(i, 1);
        }
        a.x -= treeSpeed;

        checkcrash3(neopjuk, a);

        a.draw();
    });
    neopjuk.update();
    neopjuk.draw();
}

eachframe();

// ...

function checkCollision(rect1, rect2) {
    var rect1Left = rect1.x;
    var rect1Right = rect1.x + rect1.width;
    var rect1Top = rect1.y;
    var rect1Bottom = rect1.y + rect1.height;

    var rect2Left = rect2.x;
    var rect2Right = rect2.x + rect2.width;
    var rect2Top = rect2.y;
    var rect2Bottom = rect2.y + rect2.height;

    // 충돌 여부 계산
    if (
        rect1Left < rect2Right &&
        rect1Right > rect2Left &&
        rect1Top < rect2Bottom &&
        rect1Bottom > rect2Top
    ) {
        return true; // 충돌 발생
    }

    return false; // 충돌 없음
}

function checkcrash(neopjuk, tree) {
    var isColliding = checkCollision(neopjuk, tree);
    if (isColliding) {
        gameOver();
        cancelAnimationFrame(animation);
    }
}

function checkcrash2(neopjuk, computer) {
    var isColliding = checkCollision(neopjuk, computer);
    if (isColliding) {
        gameOver();
        cancelAnimationFrame(animation);
    }
}

function checkcrash3(neopjuk, goose) {
    var isColliding = checkCollision(neopjuk, goose);
    if (isColliding) {
        gameOver();
        cancelAnimationFrame(animation);
    }
}

// ...

// function checkcrash(neopjuk, tree) {
//   var xdiff = tree.x - (neopjuk.x + neopjuk.width);
//   var ydiff = tree.y - (neopjuk.y + neopjuk.height)
//   if (xdiff < 0 && ydiff < 0) {
//     gameOver();
//     // ctx.clearRect(0, 0, canvas.width, canvas.height);
//     cancelAnimationFrame(animation);
//   }
// }

// function checkcrash2(neopjuk, computer) {
//     var xdiff2 = computer.x - (neopjuk.x + neopjuk.width);
//     var ydiff2 = computer.y - (neopjuk.y + neopjuk.height);
//     if (xdiff2 < 0 && ydiff2 < 0) {
//         gameOver();
//     //   ctx.clearRect(0, 0, canvas.width, canvas.height);
//       cancelAnimationFrame(animation);
//     }
//   }

// function checkcrash3(neopjuk, goose) {
//     var xdiff3 = goose.x - (neopjuk.x + neopjuk.width);
//     var ydiff3 = goose.y - (neopjuk.y + neopjuk.height);
//     if (xdiff3 < 0 && ydiff3 < 0) {
//         gameOver();
//         // ctx.clearRect(0, 0, canvas.width, canvas.height);
//         cancelAnimationFrame(animation);
//     }
// }

var isDownArrowPressed = false;
var isJumpKeyPressed = false;

document.addEventListener("keydown", function (e) {
    if (isGameOver) {
        restart();
    } else if (e.code === "Space") {
        neopjuk.jump();
    }
    if (e.code === "ArrowDown" && !isDownArrowPressed) {
        isDownArrowPressed = true;
        neopjuk.isDownArrowPressed = true;
        // neopjuk.y = canvas.height * 0.45 + canvas.height * 0.25 * 0.6;
        // neopjuk.draw = function(){
        //     ctx.drawImage(img_neopjuk2, this.x, this.y, this.width, this.height);
        // }
        // neopjuk.draw(); // 그려지는 위치 업데이트
    }

    // if (e.code === "ArrowDown" && !isDownArrowPressed){
    //     isDownArrowPressed = true;
    //     neopjuk.width = canvas.height * 0.25 * 0.6;
    //     neopjuk.height = canvas.height * 0.25 * 0.6;
    //     neopjuk.y = canvas.height * 0.45 + canvas.height * 0.25 * 0.6;
    //     neopjuk.draw = function(){
    //         ctx.drawImage(img_neopjuk2, this.x, this.y, this.width, this.height);
    //     }
    // }
});

document.addEventListener("keyup", function (e) {
    if (e.code === "ArrowDown" && isDownArrowPressed) {
        isDownArrowPressed = false;
        neopjuk.isDownArrowPressed = false;
        // neopjuk.y = canvas.height * 0.45;
        // neopjuk.width = canvas.height * 0.25 * 1.1;
        // neopjuk.height = canvas.height * 0.25;
        // neopjuk.draw = function(){
        //     ctx.drawImage(img_neopjuk, this.x, this.y, this.width, this.height);
        // }
        // neopjuk.draw(); // 그려지는 위치 업데이트
    }
    if (e.code === "Space") {
        isJumpKeyPressed = false;
    }
});

// 게임 종료 화면
var isGameOver = false;

function gameOver() {
    // cancelAnimationFrame(animation);
    isGameOver = true;
    // 종료 화면을 그리는 코드 작성
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // 검은색 배경에 투명도 적용
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    ctx.fillText(
        "Press any key to restart",
        canvas.width / 2,
        canvas.height / 2 + 40
    );
    cancelAnimationFrame(animation);
}

// 게임 재시작
function restart() {
    isGameOver = false;
    manytrees = [];
    manycomputers = [];
    manygeese = [];
    neopjuk.x = 10;
    neopjuk.y = 150;
    neopjuk.velocity = 0;
    neopjuk.jumpCount = 0;
    eachframe();
}

canvas.addEventListener("click", function () {
    if (isGameOver) {
        restart();
    }
});
