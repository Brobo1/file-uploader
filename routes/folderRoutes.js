const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

folderRouter.get("/", folderController.rootGet);
folderRouter.get("/:folderId", folderController.folderGet);
folderRouter.post("/:folderId/create-folder", folderController.addFolderPost);

folderRouter.post(
  "/:folderId/upload-file",
  upload.any(),
  folderController.fileUpload,
);
folderRouter.get("/:fileId/download", folderController.fileDownload);

folderRouter.post("/:type/:id/rename", folderController.itemRename);
folderRouter.delete("/:type/:id/delete", folderController.itemDelete);
module.exports = folderRouter;
