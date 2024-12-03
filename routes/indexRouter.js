const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const validator = require("../controllers/validator");

indexRouter.get("/", indexController.indexGet);

indexRouter.post(
  "/signup",
  validator.signupValidator,
  indexController.indexSignupPost,
);

indexRouter.post(
  "/login",
  validator.loginValidator,
  indexController.indexLoginPost,
);

indexRouter.get("/login", indexController.indexLoginGet);

indexRouter.get("/logout", indexController.userLogoutGet);

module.exports = indexRouter;
