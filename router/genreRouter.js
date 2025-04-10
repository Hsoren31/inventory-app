const { Router } = require("express");
const genreController = require("../controller/genreController");
const genreRouter = Router();

genreRouter.get("/", genreController.getGenres);

genreRouter.get("/create", genreController.createGenreGet);
genreRouter.post("/create", genreController.createGenrePost);

module.exports = genreRouter;
