const { validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db/queries");

exports.folderGet = async (req, res) => {
  const folders = await db.folderGetSpecific(req.user.id, null);
  console.log(folders);
  res.render("folder", { folders: folders });
};

exports.addFolderPost = async (req, res) => {
  // await db.folderCreate("Photos2", req.user.id, 6);
  res.redirect("/folder");
};
