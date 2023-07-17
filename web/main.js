const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
// const router = require("./routes");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use("/", router);

app.use((req, res, next) => {
  const url = req.url;
  if (req.url === "/") {
    req.url = "/index2.html";
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