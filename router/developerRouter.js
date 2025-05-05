const { Router } = require("express");
const developerController = require("../controller/developerController");
const developerRouter = Router();

developerRouter.get("/", developerController.getDevelopers);

developerRouter.get("/create", developerController.createDeveloperGet);
developerRouter.post("/create", developerController.createDeveloperPost);

developerRouter.get("/:id", developerController.viewDeveloper);

developerRouter.get("/:id/update", developerController.updateDeveloperGet);
developerRouter.post("/:id/update", developerController.updateDeveloperPost);

developerRouter.post("/:id/delete", developerController.deleteDeveloper);

module.exports = developerRouter;
