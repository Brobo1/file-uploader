const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const validator = require("../controllers/validator");

indexRouter.get("/", indexController.indexGet);

indexRouter.post(
  "/signup",
  validator.signupValidator,
  indexController.userSignupPost,
);

indexRouter.post(
  "/login",
  validator.loginValidator,
  indexController.userLoginPost,
);

indexRouter.get("/login", indexController.userLoginGet);
indexRouter.get("/signup", indexController.userSignupGet);

indexRouter.get("/logout", indexController.userLogoutGet);

module.exports = indexRouter;
