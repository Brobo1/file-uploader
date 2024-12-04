const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

folderRouter.get("/", folderController.folderGet);
folderRouter.post("/", folderController.addFolderPost);
module.exports = folderRouter;
