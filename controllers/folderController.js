const { validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db/queries");
const path = require("path")

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
  await db.folderCreate(folderName, req.user.id, folder ? folder.id : null);
  res.redirect("/folder" + path);
};

exports.folderRename = async (req, res) => {
  await db.folderChangeName(
    req.user.id,
    parseInt(req.body.folderId),
    req.body.folderName,
  );
  let folderPath = req.params.folderPath
  res.redirect(`/folder/${path.dirname(folderPath)}`);
};

exports.folderDelete = async (req, res) => {
  console.log("DELETE request received:", req.params.folderId);
  await db.folderDelete(req.user.id, parseInt(req.params.folderId));
  res.status(200).json({ message: "Folder deleted successfully!" });
};
