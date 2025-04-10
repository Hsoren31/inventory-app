require("dotenv").config();
const express = require("express");
const app = express();

const path = require("node:path");
const gameRouter = require("./router/gameRouter");
const genreRouter = require("./router/genreRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/games", gameRouter);
app.use("/genres", genreRouter);
app.get("/", (req, res) => res.render("index"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app listening to port ${PORT}!`);
});
