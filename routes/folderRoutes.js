const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

folderRouter.post("/rename/:folderPath(*)", folderController.folderRename);
folderRouter.post("/:folderPath(*)", folderController.addFolderPost);

folderRouter.get("/:folderPath(*)", folderController.folderGet);

module.exports = folderRouter;
