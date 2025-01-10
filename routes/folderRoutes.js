const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

folderRouter.get("/", folderController.rootGet);
folderRouter.get("/:folderId", folderController.folderGet);
folderRouter.delete("/delete/:folderId", folderController.folderDelete);
folderRouter.post("/rename/:folderPath(*)", folderController.folderRename);
folderRouter.post("/:folderPath(*)", folderController.addFolderPost);

module.exports = folderRouter;
