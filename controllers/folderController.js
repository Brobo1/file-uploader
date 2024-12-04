const { validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db/queries");

exports.folderGet = async (req, res) => {
  res.render("folder");
};

exports.addFolderPost = async (req, res) => {};
