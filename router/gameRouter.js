const { Router } = require("express");
const gameController = require("../controller/gameController");
const gameRouter = Router();

gameRouter.get("/", gameController.getGames);
gameRouter.get("/create", gameController.createGameGet);
gameRouter.post("/create", gameController.createGamePost);

gameRouter.get("/:id", gameController.viewGame);

gameRouter.get("/:id/update", gameController.gameUpdateGet);
gameRouter.post("/:id/update", gameController.gameUpdatePost);

gameRouter.post("/:id/delete", gameController.deleteGame);

module.exports = gameRouter;
