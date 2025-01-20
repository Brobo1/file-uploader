const { validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db/queries");

exports.indexGet = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/folder");
  }

  res.render("index");
};

exports.userLoginGet = async (req, res) => {
  res.render("login");
};

exports.userLoginPost = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(400)
      .render("login", { title: "Login", error: error.array() });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    console.log(info);
    if (!user) {
      return res.status(401).render("login", {
        title: "Login",
        error: [{ msg: info?.message || "Login failed" }],
      });
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      return res.redirect("/folder");
    });
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
  const { username, password, confirmPassword } = req.body;
  if (!error.isEmpty()) {
    return res.status(400).render("signup", { error: error.array() });
  }
  await db.userSignup(username, password);
  passport.authenticate("local", {
    successRedirect: "/folder",
    failureRedirect: "/signup",
  })(req, res);
};

exports.userLogoutGet = async (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(400).send("Logout failed");
    }
    res.redirect("/login");
  });
};
