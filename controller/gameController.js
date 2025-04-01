//mock database
const db = [
  { title: "game", year: 2025, price: 60 },
  { title: "game 1", year: 2025, price: 75 },
  { title: "original game", year: 2010, price: 40 },
];

function getGames(req, res) {
  const games = db;
  res.send("Games: " + games.map((game) => game.title).join(", "));
}

function createGameGet(req, res) {
  res.render("createGame", { title: "Create Game" });
}

function createGamePost(req, res) {
  const { title, year, price } = req.body;
  db.push({ title, year, price });
  res.redirect("/games");
}

module.exports = {
  getGames,
  createGameGet,
  createGamePost,
};
