const { validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db/queries");

exports.folderGet = async (req, res) => {
  const folders = await db.folderGetChildrenByPath(req.user.id, req.path);
  console.log(decodeURI(req.path));
  res.render("folder", { folders: folders });
};

exports.addFolderPost = async (req, res) => {
  let path = "";
  if (req.path !== "/") path = `/${req.params.path}`;

  const folder = await db.folderGetByPath(req.user.id, path);

  await db.folderCreate("New folder", req.user.id, folder.id);
  res.redirect("/folder" + path);
};
