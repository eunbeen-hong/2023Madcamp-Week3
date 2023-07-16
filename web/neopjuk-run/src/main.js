var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = canvas.width * 0.6;
    drawBackground();
}

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var backgroundImage = new Image();
    backgroundImage.src = "../assets/neopjuk_background.jpeg";

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // ctx.fillStyle = "skyblue";
    // ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);

    // ctx.fillStyle = "#82c24e";
    // ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
}

resizeCanvas();

window.addEventListener("resize", function () {
    resizeCanvas();
});

class Neopjuk {
    constructor() {
        this.x = canvas.width * 0.07;
        this.y = canvas.height * 0.45;
        this.width = canvas.height * 0.25;
        this.height = canvas.height * 0.25;
        this.maxJumps = 2; // Maximum number of jumps allowed
        this.jumpCount = 0; // Number of ju   mps made
        this.jumpSpeed = canvas.width*0.007;
        this.gravity = this.jumpSpeed*0.025;
        this.velocity = 0;
        this.isJumpKeyPressed = false;
        this.isDownArrowPressed = false; // 아래 방향키 눌림 여부
        this.isRunning = false; // Flag to track if Neopjuk is running
        this.frameCounter = 0; // Counter to track frames
    }

    draw() {
        if (this.isDownArrowPressed) {
            const scaledWidth = this.width * 0.7;
            const scaledHeight = this.height * 0.7;
            const x = this.x + (this.width - scaledWidth) / 2;
            const y = this.y + (this.height - scaledHeight);
            ctx.drawImage(img_neopjuk2, x, y, scaledWidth, scaledHeight);
        }
        else if (this.isRunning) {
            ctx.drawImage(img_neopjuk_run, this.x, this.y, this.width, this.height);
        }
        else if (isGameOver) {
            const scaledHeight = this.height * 0.9;
            const scaledWidth = scaledHeight * 1.3;
            const x = this.x + (this.width - scaledWidth) / 2;
            const y = this.y + (this.height - scaledHeight);
            ctx.drawImage(img_end, x, y, scaledWidth, scaledHeight);
        }
        else {
            ctx.drawImage(img_neopjuk, this.x, this.y, this.width, this.height);
        }

    //   ctx.fillStyle = "green";
    //   ctx.fillRect(this.x, this.y, this.width, this.height);
    //   ctx.drawImage(img_neopjuk, this.x, this.y, this.width, this.height);
    }

    jump() {
        if (this.jumpCount < this.maxJumps && !this.isJumpKeyPressed) {
            this.velocity = -this.jumpSpeed;
            this.jumpCount++;
            this.isJumpKeyPressed = true;
        }
    }

    update() {
        this.y += this.velocity;
        this.velocity += this.gravity;

        if (this.y > canvas.height * 0.45) {
            this.y = canvas.height * 0.45;
            this.velocity = 0;
            this.jumpCount = 0; // Reset jump count
            this.isJumpKeyPressed = false;
            // this.isRunning = false;
        }
        else if (this.y < canvas.height * 0.45) {
            this.isRunning = false;
        }
        else if (this.isDownArrowPressed) {
            // ...
        }
        else {
            this.frameCounter++; // Increment the frame counter

            if (this.frameCounter === 2) {
                this.isRunning = !this.isRunning; // Toggle isRunning flag
                this.frameCounter = 0; // Reset the frame counter
            }
        }

        // else if (this.isDownArrowPressed) {
        //     this.y = canvas.height * 0.45 + canvas.height * 0.25 * 0.3;
        //     this.width = canvas.height * 0.25 * 0.7;
        //     this.height = canvas.height * 0.25 * 0.7;
        // }
        // else{
        //     this.y = canvas.height * 0.45;
        //     this.width = canvas.height * 0.25;
        //     this.height = canvas.height * 0.25;
        // }
    }
}

var fps = 60; // 변경할 fps 값 (예: 30)

var img_neopjuk = new Image();
var img_neopjuk2 = new Image();
var img_neopjuk_run = new Image();
var img_kkariyong = new Image();
var img_computer = new Image();
var img_goose = new Image();
var img_end = new Image();
var img_cloud1 = new Image();
var img_cloud2 = new Image();
var img_grass1 = new Image();
var img_grass2 = new Image();

img_neopjuk.src = "../assets/neop.png";
img_kkariyong.src = "../assets/longobs.png";
img_computer.src = "../assets/shortobs.png";
img_goose.src = "../assets/goose.png";
img_neopjuk2.src = "../assets/neopjuk2.png";
img_neopjuk_run.src = "../assets/neopjuk3.png";
img_end.src = "../assets/neopjuk_end.png";
img_cloud1.src = "../assets/cloud1.png";
img_cloud2.src = "../assets/cloud2.png";
img_grass1.src = "../assets/grass1.png";
img_grass2.src = "../assets/grass2.png";

class Tree {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height * 0.45 - canvas.height * 0.25 * 0.2;
        this.width = canvas.height * 0.25 * 0.4;
        this.height = canvas.height * 0.25 * 1.2;
    }

    draw() {
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img_kkariyong, this.x, this.y, this.width, this.height);
    }
}

class Computer {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height * 0.45 + canvas.height * 0.25 * 0.55;
        this.width = canvas.height * 0.25 * 0.50;
        this.height = canvas.height * 0.25 * 0.45;
    }

    draw() {
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
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
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img_goose, this.x, this.y, this.width, this.height);
    }
}

class Cloud {
    constructor(y){
        this.x = canvas.width;
        this.y = y;
        this.width = canvas.height * 0.25 * 0.7;
        this.height = canvas.height * 0.25 * 0.4;
        this.image = 0;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

var timer = 0;
var manytrees = [];
var manycomputers = [];
var manygeese = [];
var manyclouds = [];
var manygrass = [];
var animation;
var treeSpeed = 3; // 장애물의 이동 속도

var neopjuk = new Neopjuk(); // Neopjuk 클래스의 인스턴스 생성

var score = 0;
var highscore = 0;

function eachframe() {    
    animation = requestAnimationFrame(eachframe);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
//   ctx.fillStyle = "gray";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "right";
    ctx.fillText("Highscore: " + highscore, canvas.width - 20, 60);
    ctx.fillText("Score: " + score, canvas.width - 20, 30);

    // 스코어 증가
    if (timer % 60 === 0 && gameStarted) {
        score++;
        if(highscore <= score){
            highscore = score;
        }
    }
    if (timer % 200 === 0 && gameStarted) {
        var randomValue = Math.random();
        if (randomValue < 0.33) {
            var tree = new Tree();
            manytrees.push(tree);
        }
        else if (0.33 <= randomValue && randomValue < 0.67) {
            var goose = new Goose();
            manygeese.push(goose);
        }
        else {
            var computer = new Computer();
            manycomputers.push(computer);
        }
    }
    
    var randomValue = Math.random();
    if (randomValue < 0.02 && gameStarted && (timer%10) < 3) {
        var randomY = Math.random();
        var cloud = new Cloud(randomY * 100);
        manyclouds.push(cloud);
        if(randomValue<0.01){
            cloud.image = img_cloud1;
        }
        else{
            cloud.image = img_cloud2;
        }
    }

    manyclouds.forEach((a, i, o) => {
        if (a.x < -a.width) {
            o.splice(i, 1);
        }
        a.x -= treeSpeed * 0.8;

        a.draw();
    });
    

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

        checkcrash2(neopjuk, a);

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

    neopjuk.update(); // neopjuk의 update 메서드 호출
    neopjuk.draw(); // neopjuk의 draw 메서드 호출
}

eachframe();

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
    if (rect1Left < rect2Right && rect1Right > rect2Left && rect1Top < rect2Bottom && rect1Bottom > rect2Top) {
        return true; // 충돌 발생
    }
  
    return false; // 충돌 없음
}

function checkcrash(neopjuk, tree) {
    var isColliding;
    if (neopjuk.isDownArrowPressed) {
        var scaledWidth = neopjuk.width * 0.7;
        var scaledHeight = neopjuk.height * 0.7;
        var adjustedNeopjuk = {
            x: neopjuk.x + (neopjuk.width - scaledWidth) / 2,
            y: neopjuk.y + (neopjuk.height - scaledHeight),
            width: scaledWidth,
            height: scaledHeight
        };
        isColliding = checkCollision(adjustedNeopjuk, tree);
    } else {
        isColliding = checkCollision(neopjuk, tree);
    }
    if (isColliding) {
        gameOver();
        cancelAnimationFrame(animation);
    }
}


function checkcrash2(neopjuk, computer) {
    var isColliding;
    if (neopjuk.isDownArrowPressed) {
        var scaledWidth = neopjuk.width * 0.7;
        var scaledHeight = neopjuk.height * 0.7;
        var adjustedNeopjuk = {
            x: neopjuk.x + (neopjuk.width - scaledWidth) / 2,
            y: neopjuk.y + (neopjuk.height - scaledHeight),
            width: scaledWidth,
            height: scaledHeight
        };
        isColliding = checkCollision(adjustedNeopjuk, computer);
    } else {
        isColliding = checkCollision(neopjuk, computer);
    }
    if (isColliding) {
        gameOver();
        cancelAnimationFrame(animation);
    }
}

function checkcrash3(neopjuk, goose) {
    var isColliding;
    if (neopjuk.isDownArrowPressed) {
        var scaledWidth = neopjuk.width * 0.7;
        var scaledHeight = neopjuk.height * 0.7;
        var adjustedNeopjuk = {
            x: neopjuk.x + (neopjuk.width - scaledWidth) / 2,
            y: neopjuk.y + (neopjuk.height - scaledHeight),
            width: scaledWidth,
            height: scaledHeight
        };
        isColliding = checkCollision(adjustedNeopjuk, goose);
    } else {
        isColliding = checkCollision(neopjuk, goose);
    }
    if (isColliding) {
        gameOver();
        cancelAnimationFrame(animation);
    }
}

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

document.addEventListener("keydown", function (e) {
    // if (isGameOver) {
    //     restart();
    // } else if (e.code === "Space") {
    if (e.code === "Space") {
        neopjuk.jump(); // neopjuk의 jump 메서드 호출
    }

    if (e.code === "ArrowDown" && !neopjuk.isDownArrowPressed) {
        neopjuk.isDownArrowPressed = true;
        // neopjuk.width = canvas.height * 0.17;
        // neopjuk.height = canvas.height * 0.15;
        // neopjuk.y = canvas.height * 0.55;
        // neopjuk.draw = function () {
        //     ctx.drawImage(img_neopjuk2, this.x, canvas.height * 0.55, this.width, this.height);
        //     ctx.fillStyle = "red";
        //     ctx.fillRect(this.x, canvas.height * 0.55, this.width, this.height);
        // };
    }
});

document.addEventListener("keyup", function (e) {
    if (e.code === "ArrowDown" && neopjuk.isDownArrowPressed) {
        neopjuk.isDownArrowPressed = false;
        // neopjuk.width = canvas.height * 0.25 * 1.1;
        // neopjuk.height = canvas.height * 0.25;
        // neopjuk.draw = function () {
        //     ctx.drawImage(img_neopjuk, this.x, this.y, this.width, this.height);
        // };
    }
    if (e.code === "Space") {
        neopjuk.isJumpKeyPressed = false;
    }
});

var isGameOver = false;

function gameOver() {
    isGameOver = true;

    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    ctx.fillText("Click to restart", canvas.width / 2, canvas.height / 2 + 40);
    neopjuk.isRunning = false;
    cancelAnimationFrame(animation);
}

function restart() {
    isGameOver = false;
    manytrees = [];
    manycomputers = [];
    manygeese = [];
    neopjuk.x = canvas.width * 0.07;
    neopjuk.y = canvas.height * 0.45;
    neopjuk.width = canvas.height * 0.25;
    neopjuk.height = canvas.height * 0.25;
    neopjuk.jumpCount = 0; // Number of jumps made
    neopjuk.jumpSpeed = canvas.width*0.007;
    neopjuk.gravity = neopjuk.jumpSpeed*0.025;
    neopjuk.velocity = 0;
    neopjuk.isJumpKeyPressed = false;
    neopjuk.isDownArrowPressed = false; // 아래 방향키 눌림 여부
    neopjuk.isRunning = false; // Flag to track if Neopjuk is running
    neopjuk.frameCounter = 0; // Counter to track frames
    score = 0;
    cancelAnimationFrame(animation);
    eachframe();
}

canvas.addEventListener("click", function () {
    // if (isGameOver) {
    //     restart();
    //     gameStarted = false;
    // }
    // else 
    if (isGameOver) {
        restart();
        isGameOver = false;
    }
    else if (!gameStarted) {
        startGame();
    }
});

function startGameScreen() {
    var backgroundImage = new Image();
    backgroundImage.src = "neopjuk_background.jpeg";

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Start", canvas.width / 2, canvas.height / 2);
    ctx.fillText("Click to start", canvas.width / 2, canvas.height / 2 + 40);
    cancelAnimationFrame(animation);
}

var gameStarted = false;

function startGame(){
    gameStarted = true;
    eachframe();
}

startGameScreen();