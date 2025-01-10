const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

folderRouter.get("/", folderController.rootGet);
folderRouter.get("/:folderId", folderController.folderGet);
folderRouter.post("/:folderId/create-folder", folderController.addFolderPost);
folderRouter.delete("/:folderId/delete", folderController.folderDelete);
folderRouter.post("/:folderId/rename", folderController.folderRename);

module.exports = folderRouter;
