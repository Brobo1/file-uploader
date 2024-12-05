const { validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db/queries");

exports.folderGet = async (req, res) => {
  console.log(req.path);
  const folders = await db.folderGetSpecific(req.user.id, req.path);
  res.render("folder", { folders: folders });
};

exports.addFolderPost = async (req, res) => {
  // await db.folderCreate("Image2", req.user.id, 2);
  res.redirect("/folder");
};
