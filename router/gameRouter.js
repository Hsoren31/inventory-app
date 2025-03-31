const { Router } = require("express");

const gameRouter = Router();

gameRouter.get("/", (req, res) => res.send("all games"));

module.exports = gameRouter;
