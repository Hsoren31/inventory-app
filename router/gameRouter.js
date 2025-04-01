const { Router } = require("express");
const gameController = require("../controller/gameController");
const gameRouter = Router();

gameRouter.get("/", gameController.getGames);
gameRouter.get("/create", gameController.createGameGet);
gameRouter.post("/create", gameController.createGamePost);

module.exports = gameRouter;
