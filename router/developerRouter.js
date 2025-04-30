const { Router } = require("express");
const developerController = require("../controller/developerController");
const developerRouter = Router();

developerRouter.get("/", developerController.getDevelopers);

developerRouter.get("/create", developerController.createDeveloperGet);
developerRouter.post("/create", developerController.createDeveloperPost);

developerRouter.get("/:id", developerController.viewDeveloper);

module.exports = developerRouter;
