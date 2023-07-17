const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    console.log("http://localhost:" + port);
});
