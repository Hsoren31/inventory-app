const { Router } = require("express");
const gameController = require("../controller/gameController");
const gameRouter = Router();

gameRouter.get("/", gameController.getGames);

module.exports = gameRouter;
