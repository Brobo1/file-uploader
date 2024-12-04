const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const validator = require("../controllers/validator");

indexRouter.get("/", indexController.indexGet);

indexRouter.get("/signup", indexController.userSignupGet);
indexRouter.post(
  "/signup",
  validator.signupValidator,
  indexController.userSignupPost,
);

indexRouter.get("/login", indexController.userLoginGet);
indexRouter.post(
  "/login",
  validator.loginValidator,
  indexController.userLoginPost,
);

indexRouter.get("/logout", indexController.userLogoutGet);

indexRouter.post(
  "/upload",
  upload.single("file_upload"),
  indexController.uploadPost,
);

module.exports = indexRouter;
