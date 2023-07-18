var canvas = document.getElementById("canvas3");
var ctx = canvas.getContext("2d");

function saveHighscoreToServer(_highscore_grade) {
    // 서버의 URL 설정
    const url = 'http://localhost:3000/drop-and-catch';
  
    // 요청 본문 데이터 생성
    const data = {
      highscore_grade: _highscore_grade
    };
    console.log(JSON.stringify(data));
    // fetch를 사용하여 POST 요청 전송
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        console.log('Highscore sent to the server.');
        // 성공적으로 요청을 보냈을 때 실행할 코드 작성
      } else {
        console.error('Failed to send highscore_grade to the server.', response.status);
        // 요청을 보내지 못했을 때 실행할 코드 작성
      }
    })
    .catch(error => {
        console.log(data);
      console.error('Error while sending highscore_grade:', error);
      // 요청 전송 중 오류가 발생했을 때 실행할 코드 작성
    });
  }
  

function resizecanvas() {
    canvas.width = 800;
    canvas.height = 600;
    // canvas.width = window.innerWidth * 0.8;
    // canvas.height = canvas.width * 0.6;
    drawBackground();
}

function drawBackground() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 배경색 그리기
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var backgroundImage = new Image();
    // backgroundImage.src = "drop-and-catch/assets/dac_background.jpeg";
    backgroundImage.src = "../assets/dac_background.jpeg";

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // ctx.fillStyle = "skyblue";
    // ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);

    // ctx.fillStyle = "#82c24e";
    // ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
}

resizecanvas();

window.addEventListener("resize", function () {
    resizecanvas();
});

class Player {
    constructor() {
        this.height = canvas.height * 0.16;
        this.width = this.height * 0.6;
        this.x = canvas.width * 0.5;
        this.y = canvas.height - this.height * 1.03;
        this.isLeftArrowPressed = false;
        this.isRightArrowPressed = false;
    }

    draw() {
        ctx.drawImage(img_neopjuk, this.x, this.y, this.width, this.height);

        //   ctx.fillStyle = "green";
        //   ctx.fillRect(this.x, this.y, this.width, this.height);
        //   ctx.drawImage(img_neopjuk, this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        if (this.x > 0) {
            // 왼쪽 끝에 도달하지 않았을 때만 왼쪽으로 이동
            this.x -= 5; // 이동할 거리를 원하는 값으로 조정하세요.
        }
    }

    moveRight() {
        if (this.x + this.width < canvas.width) {
            // 오른쪽 끝에 도달하지 않았을 때만 오른쪽으로 이동
            this.x += 5; // 이동할 거리를 원하는 값으로 조정하세요.
        }
    }

    // update() {
    //     this.y += this.velocity;
    //     this.velocity += this.gravity;
    // }
}

var fps = 60; // 변경할 fps 값 (예: 30)

var img_neopjuk = new Image();
var img_neopjuk2 = new Image();
var img_neopjuk_run = new Image();
var img_end = new Image();
var img_Aplus = new Image();
var img_A = new Image();
var img_C = new Image();
var img_Cminus = new Image();
var img_F = new Image();
var img_life = new Image();

// img_neopjuk.src = "drop-and-catch/assets/player.png";
// img_neopjuk2.src = "drop-and-catch/assets/neopjuk2.png";
// img_neopjuk_run.src = "drop-and-catch/assets/neopjuk3.png";
// img_end.src = "drop-and-catch/assets/neopjuk_end.png";
// img_Aplus.src = "drop-and-catch/assets/Aplus.png";
// img_A.src = "drop-and-catch/assets/A.png";
// img_C.src = "drop-and-catch/assets/C.png";
// img_Cminus.src = "drop-and-catch/assets/Cminus.png";
// img_F.src = "drop-and-catch/assets/F.png";
// img_life.src = "drop-and-catch/assets/life.png";

img_neopjuk.src = "../assets/player.png";
img_neopjuk2.src = "../assets/neopjuk2.png";
img_neopjuk_run.src = "../assets/neopjuk3.png";
img_end.src = "../assets/neopjuk_end.png";
img_Aplus.src = "../assets/Aplus.png";
img_A.src = "../assets/A.png";
img_C.src = "../assets/C.png";
img_Cminus.src = "../assets/Cminus.png";
img_F.src = "../assets/F.png";
img_life.src = "../assets/life.png";

class Grade {
    constructor(x, type, image) {
        this.x = x;
        this.y = 0;
        this.width = canvas.height * 0.25 * 0.4;
        this.height = canvas.height * 0.25 * 0.4;
        this.type = type;
        this.image = image;
        this.collisionCount = 0;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    handleCollision() {
        if (this.type === "good_grade") {
            score++;
        } else if (this.type === "bad_grade") {
            this.collisionCount++;
            lives--;

            if (this.collisionCount === 3 || lives === 0) {
                gameOver();
                cancelAnimationFrame(animation);
            }
        }

        if (score > highscore_grade) {
            highscore_grade = score;
            saveHighscoreToServer(highscore_grade);
        }
    }
}

var timer = 0;
var manyclouds = [];
var animation;
var cloudspeed = 3; // 장애물의 이동 속도

var neopjuk = new Player(); // Player 클래스의 인스턴스 생성

var score = 0;
var highscore_grade = 0;
var highscore_grade = localStorage.getItem("highscore_grade");
if (!highscore_grade) {
    highscore_grade = 0;
} else {
    highscore_grade = parseInt(highscore_grade);
}

var lives = 3;

function drawLives() {
    var lifeSize = canvas.height * 0.1;
    var margin = (canvas.height * 0.07) / 3;

    for (var i = 0; i < lives; i++) {
        ctx.drawImage(
            img_life,
            margin + i * (lifeSize + margin),
            margin,
            lifeSize,
            lifeSize * 1.4
        );
    }
}

function eachframe() {
    animation = requestAnimationFrame(eachframe);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    // 스코어 증가
    // if (timer % 60 === 0 && gameStarted) {
    //     score++;
    //     if (highscore_grade <= score) {
    //         highscore_grade = score;
    //     }
    // }

    var randomValue = Math.random();
    var randomValueImage = Math.random();
    if (timer % 50 === 0) {
        var randomY = Math.random();
        var type = randomValue < 0.5 ? "bad_grade" : "good_grade";
        var image;
        if (type === "good_grade") {
            if (randomValueImage < 0.5) {
                image = img_Aplus;
            } else {
                image = img_A;
            }
        } else if (type === "bad_grade") {
            if (randomValueImage < 0.33) {
                image = img_C;
            } else if (randomValueImage < 0.67) {
                image = img_Cminus;
            } else {
                image = img_F;
            }
        }
        var cloud = new Grade(
            randomY * (canvas.width - canvas.height * 0.25 * 0.7),
            type,
            image
        );
        manyclouds.push(cloud);
    }

    manyclouds.forEach((a, i, o) => {
        if (a.y > canvas.height) {
            o.splice(i, 1);
        }
        a.y += cloudspeed;

        a.draw();

        // 충돌 감지
        if (
            neopjuk.x < a.x + a.width &&
            neopjuk.x + neopjuk.width > a.x &&
            neopjuk.y < a.y + a.height &&
            neopjuk.y + neopjuk.height > a.y
        ) {
            o.splice(i, 1);
            a.handleCollision();
        }
    });

    // if (neopjuk.isLeftArrowPressed) {
    //     neopjuk.moveLeft();
    // }

    // if (neopjuk.isRightArrowPressed) {
    //     neopjuk.moveRight();
    // }

    // neopjuk.update(); // neopjuk의 update 메서드 호출

    // 텍스트 크기를 조정할 비율 계산
    var textScale = canvas.width / 800;

    // 텍스트 크기 조정
    var textSize = 20 * textScale;
    ctx.font = textSize + "px Arial";

    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.fillText(
        "Highscore: " + highscore_grade,
        canvas.width - textScale * 20,
        textScale * 60
    );
    ctx.fillText(
        "Score: " + score,
        canvas.width - textScale * 20,
        textScale * 30
    );

    drawLives();

    neopjuk.draw(); // neopjuk의 draw 메서드 호출
}

eachframe();

// function checkCollision(rect1, rect2) {
//     var rect1Left = rect1.x;
//     var rect1Right = rect1.x + rect1.width;
//     var rect1Top = rect1.y;
//     var rect1Bottom = rect1.y + rect1.height;

//     var rect2Left = rect2.x;
//     var rect2Right = rect2.x + rect2.width;
//     var rect2Top = rect2.y;
//     var rect2Bottom = rect2.y + rect2.height;

//     // 충돌 여부 계산
//     if (
//         rect1Left < rect2Right &&
//         rect1Right > rect2Left &&
//         rect1Top < rect2Bottom &&
//         rect1Bottom > rect2Top
//     ) {
//         return true; // 충돌 발생
//     }

//     return false; // 충돌 없음
// }

// function checkcrash(neopjuk, tree) {
//     var isColliding;
//     if (neopjuk.isDownArrowPressed) {
//         var scaledWidth = neopjuk.width * 0.7;
//         var scaledHeight = neopjuk.height * 0.7;
//         var adjustedPlayer = {
//             x: neopjuk.x + (neopjuk.width - scaledWidth) / 2,
//             y: neopjuk.y + (neopjuk.height - scaledHeight),
//             width: scaledWidth,
//             height: scaledHeight,
//         };
//         isColliding = checkCollision(adjustedPlayer, tree);
//     } else {
//         isColliding = checkCollision(neopjuk, tree);
//     }
//     if (isColliding) {
//         gameOver();
//         cancelAnimationFrame(animation);
//     }
// }

var moveRightInterval;
var moveLeftInterval;

document.addEventListener("keydown", function (e) {
    if (e.code === "ArrowLeft" && !neopjuk.isLeftArrowPressed) {
        neopjuk.isLeftArrowPressed = true;
        moveLeftInterval = setInterval(function () {
            neopjuk.moveLeft();
        }, 10);
        neopjuk.moveLeft();
    }
    if (e.code === "ArrowRight" && !neopjuk.isRightArrowPressed) {
        neopjuk.isRightArrowPressed = true;
        moveRightInterval = setInterval(function () {
            neopjuk.moveRight();
        }, 10);
        neopjuk.moveRight();
    }
});

document.addEventListener("keyup", function (e) {
    if (e.code === "ArrowLeft" && neopjuk.isLeftArrowPressed) {
        neopjuk.isLeftArrowPressed = false;
        clearInterval(moveLeftInterval);
    }

    if (e.code === "ArrowRight" && neopjuk.isRightArrowPressed) {
        neopjuk.isRightArrowPressed = false;
        clearInterval(moveRightInterval);
    }
});

var isGameOver = false;

function gameOver() {
    isGameOver = true;

    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    // 텍스트 크기를 조정할 비율 계산
    var textScale = canvas.width / 800;

    // 텍스트 크기 조정
    var textSize = 30 * textScale;
    ctx.font = textSize + "px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    ctx.fillText("Click to restart", canvas.width / 2, canvas.height / 2 + 40);
    cancelAnimationFrame(animation);

    // 로컬 스토리지에 highscore_grade 값을 저장
    localStorage.setItem("highscore_grade", highscore_grade);
}

function restart() {
    isGameOver = false;
    lives = 3;
    manyclouds = [];
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
    } else if (!gameStarted) {
        startGame();
    }
});

function startGameScreen() {
    var backgroundImage = new Image();
    // backgroundImage.src = "drop-and-catch/assets/neopjuk_background.jpeg";
    backgroundImage.src = "../assets/neopjuk_background.jpeg";

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    
    ctx.fillStyle = "white";
    // 텍스트 크기를 조정할 비율 계산
    var textScale = canvas.width / 800;
    // 텍스트 크기 조정
    var textSize = 30 * textScale;
    ctx.font = textSize + "px Arial";

    ctx.textAlign = "center";
    ctx.fillText("Game Start", canvas.width / 2, canvas.height / 2);
    ctx.fillText(
        "Click to start",
        canvas.width / 2,
        canvas.height / 2 + textScale * 40
    );
    cancelAnimationFrame(animation);
}

var gameStarted = false;

function startGame() {
    gameStarted = true;
    eachframe();
}

startGameScreen();
