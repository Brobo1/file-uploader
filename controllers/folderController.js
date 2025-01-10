const { validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db/queries");
const path = require("path");
const { render } = require("ejs");

exports.rootGet = async (req, res) => {
  const userId = req.user.id;
  const root = await db.rootFolderGet(userId);

  res.redirect(`/folder/${root.id}`);
};

exports.folderGet = async (req, res) => {
  let folder = await db.folderGet(req.user.id, req.params.folderId);
  res.render("folders", { folders: folder, files: folder.files });
};

exports.addFolderPost = async (req, res) => {
  let parentId = req.params.folderId;
  await db.folderCreate("New Folder", req.user.id, parentId);
  res.redirect(`/folder/${parentId}`);
};

exports.folderRename = async (req, res) => {
  await db.folderRename(
    req.user.id,
    parseInt(req.body.folderId),
    req.body.folderName,
  );
  console.log(req.params.folderId, req.body.folderId);
  res.redirect(`/folder/${req.params.folderId}`);
};

exports.folderDelete = async (req, res) => {
  await db.folderDelete(req.user.id, parseInt(req.params.folderId));
  res.status(200).json({ message: "Folder deleted successfully!" });
};
