require("dotenv").config();
const express = require("express");
const app = express();

const path = require("node:path");
const gameRouter = require("./router/gameRouter");
const genreRouter = require("./router/genreRouter");
const developerRouter = require("./router/developerRouter");

const gameDb = require("./db/gameQueries");
const genreDb = require("./db/genreQueries");
const developerDb = require("./db/developerQueries");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/games", gameRouter);
app.use("/genres", genreRouter);
app.use("/developers", developerRouter);
app.get("/", async (req, res) =>
  res.render("index", {
    topGenres: await genreDb.getTopGenres(),
    topDevelopers: await developerDb.getPopularDevelopers(),
    newestGames: await gameDb.getNewestGames(),
  })
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app listening to port ${PORT}!`);
});
