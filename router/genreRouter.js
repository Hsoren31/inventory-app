const { Router } = require("express");
const genreController = require("../controller/genreController");
const genreRouter = Router();

genreRouter.get("/", genreController.getGenres);

genreRouter.get("/create", genreController.createGenreGet);
genreRouter.post("/create", genreController.createGenrePost);

genreRouter.get("/:id", genreController.viewGenreGames);

genreRouter.get("/:id/update", genreController.updateGenreGet);
genreRouter.post("/:id/update", genreController.updateGenrePost);

module.exports = genreRouter;
