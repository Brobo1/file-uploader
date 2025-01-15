const { validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db/queries");
const path = require("path");
const { render } = require("ejs");
const formatDate = require("../scripts/utility/date");

exports.rootGet = async (req, res) => {
  const userId = req.user.id;
  const root = await db.rootFolderGet(userId);

  res.redirect(`/folder/${root.id}`);
};

exports.folderGet = async (req, res) => {
  let folder = await db.folderGet(req.user.id, req.params.folderId);
  res.render("folders", {
    folders: folder,
    files: folder.files,
    formatDate,
  });
};

exports.addFolderPost = async (req, res) => {
  let parentId = req.params.folderId;
  await db.folderCreate("New Folder", req.user.id, parentId);
  res.redirect(`/folder/${parentId}`);
};

exports.folderDelete = async (req, res) => {
  await db.folderDelete(req.user.id, parseInt(req.params.folderId));
  res.status(200).json({ message: "Folder deleted successfully!" });
};

exports.fileUpload = async (req, res) => {
  const files = req.files;

  for (const file of files) {
    console.log(file);
    await db.filePost(1, req.params.folderId, file.originalname, file.size);
  }

  res.redirect(`/folder/${req.params.folderId}`);
};

exports.fileDelete = async (req, res) => {
  await db.fileDelete(req.user.id, req.params.fileId, req.params.folderId);

  res.status(200).json({ message: "Folder deleted successfully!" });
};

exports.itemDelete = async (req, res) => {
  res.redirect(req.get("referer"));
};

exports.itemRename = async (req, res) => {
  await db.itemRename(req.params.type, req.params.id, req.body.itemName);
  res.redirect(req.get("referer"));
};
