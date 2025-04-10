const { Router } = require("express");
const genreController = require("../controller/genreController");
const genreRouter = Router();

genreRouter.get("/", genreController.getGenres);

module.exports = genreRouter;
