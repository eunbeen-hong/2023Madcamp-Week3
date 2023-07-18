const fs = require("fs");
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");

var authRouter = require("./auth");
var authCheck = require("./authCheck.js");
var template = require("./template.js");

const app = express();
const port = 3306;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: "~~~", // 원하는 문자 입력
        resave: false,
        saveUninitialized: true,
        store: new FileStore(),
    })
);

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
    var html = template.HTML(
        "Welcome",
        `<hr>
      <h2> 메인 페이지에 오신 것을 환영합니다</h2>
      <p> 로그인에 성공하셨습니다.</p>`,
        authCheck.statusUI(req, res)
    );
    res.send(html);
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
