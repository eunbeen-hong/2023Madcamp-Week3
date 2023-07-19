const fs = require("fs");
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");
const cors = require("cors");

var authRouter = require("./auth");
var authCheck = require("./authCheck.js");
var template = require("./template.js");

const app = express();
const port = 3000;

const mysql = require('mysql');
var db_password;

try {
    const data = fs.readFileSync('secret/db_password.json', 'utf8');
    const jsonData = JSON.parse(data);
    db_password = jsonData.password;
  } catch (error) {
    console.error('Error reading file:', error);
    return;
  }
  

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: db_password, // 본인의 데이터베이스 비밀번호로 수정해주세요.
  database: 'playjam_db'
});

app.put('/drop-and-catch', (req, res) => {
  // 브라우저로부터 전달받은 highscore_grade 값과 로그인한 사용자 정보를 추출합니다.
  const { highscore_grade } = req.body;
  const { userinfo } = req.session;

  // 예를 들어, 로그인한 사용자의 아이디를 저장하고 싶은 경우:
  const { userId } = userinfo;

  // SELECT 쿼리를 사용하여 해당 유저의 highscore 조회
  const getQuery = 'SELECT highscore_grade FROM userTable WHERE userId = ?';

  // 먼저 유저의 highscore 조회
  db.query(getQuery, [userId], (error, results) => {
    if (error) {
      console.error('Error retrieving user highscore:', error);
      res.sendStatus(500); // 서버 오류 응답
      return;
    }

    // 조회된 결과가 있을 경우
    if (results.length > 0) {
      // UPDATE 쿼리를 사용하여 유저의 highscore 업데이트
      const updateQuery = 'UPDATE userTable SET highscore_grade = ? WHERE userId = ?';

      // 유저의 highscore 업데이트
      db.query(updateQuery, [highscore_grade, userId], (error, updateResults) => {
        if (error) {
          console.error('Error updating user highscore:', error);
          res.sendStatus(500); // 서버 오류 응답
          return;
        }

        console.log('User highscore updated:', updateResults);
        res.sendStatus(200); // 성공 응답
      });
    } else {
      // INSERT 쿼리를 사용하여 새로운 레코드 생성
      const insertQuery = 'INSERT INTO userTable (userId, highscore_grade) VALUES (?, ?)';

      // 새로운 레코드 생성
      db.query(insertQuery, [userId, highscore_grade], (error, insertResults) => {
        if (error) {
          console.error('Error saving user highscore:', error);
          res.sendStatus(500); // 서버 오류 응답
          return;
        }

        console.log('User highscore saved:', insertResults);
        res.sendStatus(200); // 성공 응답
      });
    }
  });
});

// // POST 요청을 처리하는 라우트 핸들러 설정
// app.put('/drop-and-catch', (req, res) => {
//   // 브라우저로부터 전달받은 highscore 값을 추출합니다.
//   const { highscore_grade } = req.body;
  
//   // INSERT 쿼리 작성
//   const query = 'INSERT INTO userTable (highscore_grade) VALUES (?)';

//   // 쿼리 실행
//   db.query(query, [highscore_grade], (error, results) => {
//     if (error) {
//       console.error('Error saving highscore:', error);
//       res.sendStatus(500); // 서버 오류 응답
//       return;
//     }

//     console.log('Highscore saved to the database.');
//     res.sendStatus(200); // 성공 응답
//   });
// });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: "~~~", // 원하는 문자 입력
        resave: false,
        saveUninitialized: true,
        store: new FileStore(),
    })
);

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  if (authCheck.isOwner(req, res)) {
    res.redirect('/main');
  } else {
    res.redirect('/index.html');
  }
});
// 인증 라우터
app.use("/auth", authRouter);

// 메인 페이지
app.get("/main", (req, res) => {
    if (!authCheck.isOwner(req, res)) {
        res.redirect("/auth/login");
        return false;
    }
    res.redirect("/index.html");
});

app.set("view engine", "ejs");
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const url = req.url;
  if (req.url === "/") {
    req.url = "/index.html";
  }
  if (req.url === "/favicon.ico") {
    res.writeHead(404);
    return res.end();
  }
  next();
});

app.use((req, res) => {
    const url = req.url;
    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + url));
});

app.listen(port, () => {
    console.log("Server listening on port", port);
});

const user = require("./server/userController");
const router = express.Router();

router.get("/", user.index);
router.post("/join", user.post_user);

router.get("/login", user.login);
router.post("/login", user.post_login);

router.post("/edit", user.edit);
router.patch("/edit", user.patch_user);
router.delete("/delete", user.delete_user);

module.exports = router;
