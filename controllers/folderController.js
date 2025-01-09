const { validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db/queries");

exports.folderGet = async (req, res) => {
  let path = "/";
  if (req.params.folderPath) {
    path = `/${req.params.folderPath}`;
  }

  const folders = await db.folderGetChildrenByPath(
    req.user.id,
    decodeURI(path),
  );

  res.render("folders", { folders: folders });
};

exports.addFolderPost = async (req, res) => {
  let folderName = "New folder";
  let path = "";
  if (req.path !== "/") path = `/${req.params.folderPath}`;

  const folder = await db.folderGetByPath(req.user.id, path);
  console.log(folder.id);

  await db.folderCreate(folderName, req.user.id, folder.id);
  res.redirect("/folder" + path);
};

exports.folderRename = async (req, res) => {
  await db.folderChangeName(
    req.user.id,
    parseInt(req.body.folderId),
    req.body.folderName,
  );
  console.log(req.body.folderName);
  res.redirect("/folder");
};
