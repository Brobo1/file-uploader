const { body } = require("express-validator");

exports.loginValidator = [
  body("username").notEmpty().withMessage("Invalid username").escape(),
  body("password").notEmpty().withMessage("Invalid password").escape(),
];

exports.signupValidator = [
  body("username").notEmpty().withMessage("Invalid username").escape(),
  body("password").notEmpty().withMessage("Invalid password").escape(),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords are not matching"),
];

exports.memberValidator = [
  body("secret")
    .custom((value) => {
      return "i know" === value || "i super know" === value;
    })
    .withMessage("If you know you know"),
];
