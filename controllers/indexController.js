const { validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db/queries");

exports.indexGet = async (req, res) => {
  res.render("index");
};

exports.userLoginGet = async (req, res) => {
  res.render("login");
};

exports.userLoginPost = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(400)
      .render("login", { title: "Login", error: error.array() });
  }

  passport.authenticate("local", {
    successRedirect: "/folder",
    failureRedirect: "/login",
  })(req, res);
};

exports.demoLoginGet = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/folder");
  }

  req.body.username = "demo";
  req.body.password = "demo";

  passport.authenticate("local", {
    successRedirect: "/folder",
    failureRedirect: "/login",
  })(req, res);
};

exports.userSignupGet = async (req, res) => {
  res.render("signup");
};

exports.userSignupPost = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).render("index", { error: error.array() });
  }
  const { username, password } = req.body;
  await db.userSignup(username, password);
  res.redirect("/login");
};

exports.userLogoutGet = async (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(400).send("Logout failed");
    }
    res.redirect("/login");
  });
};

exports.uploadPost = async (req, res) => {
  console.log(req.file, req.body);
};
