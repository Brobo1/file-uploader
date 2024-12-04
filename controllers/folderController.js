const { validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db/queries");

exports.folderGet = async (req, res) => {
  const folders = await db.folderGet(req.user.id);
  console.log(folders);
  res.render("folder", { folders });
};

exports.addFolderPost = async (req, res) => {
  // await db.folderCreate("/", req.user.id);
  res.redirect("/folder");
};
