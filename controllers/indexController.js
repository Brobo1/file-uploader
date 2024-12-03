const { validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db/queries");

exports.indexGet = async (req, res) => {
  res.render("index");
};

exports.indexLoginPost = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(400)
      .render("login", { title: "Login", error: error.array() });
  }

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/err",
  })(req, res);
};

exports.indexSignupPost = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).render("index", { error: error.array() });
  }
  const { username, password } = req.body;
  await db.userSignup(username, password);
  res.redirect("/");
};

exports.indexLoginGet = async (req, res) => {
  res.send("Logged in user is " + req.user);
};
