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

module.exports = {
  getGames,
};
