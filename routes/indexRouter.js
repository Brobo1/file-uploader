const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const validator = require("../controllers/validator");

indexRouter.get("/", indexController.indexGet);

indexRouter.post(
  "/login",
  validator.loginValidator,
  indexController.indexLoginPost,
);

indexRouter.get("/login", indexController.indexLoginGet);

indexRouter.post(
  "/signup",
  validator.signupValidator,
  indexController.indexSignupPost,
);

module.exports = indexRouter;
