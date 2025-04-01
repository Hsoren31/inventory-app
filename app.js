const express = require("express");
const app = express();

const path = require("node:path");
const gameRouter = require("./router/gameRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/games", gameRouter);
app.get("/", (req, res) => res.send("hello world!"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app listening to port ${PORT}!`);
});
