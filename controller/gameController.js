const db = require("../db/queries");

async function getGames(req, res) {
  const games = await db.getAllGames();
  console.log("Games: ", games);
  res.send("Games: " + games.map((game) => game.title).join(", "));
}

function createGameGet(req, res) {
  res.render("createGame", { title: "Create Game" });
}

async function createGamePost(req, res) {
  const { title, year, price } = req.body;
  await db.insertGame({ title, year, price });
  res.redirect("/games");
}

module.exports = {
  getGames,
  createGameGet,
  createGamePost,
};
