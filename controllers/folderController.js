const db = require("../db/queries");
const formatDate = require("../scripts/util/date");
const { supabaseConn } = require("../scripts/util/supabase");

exports.rootGet = async (req, res) => {
  const userId = req.user.id;
  const root = await db.rootFolderGet(userId);

  res.redirect(`/folder/${root.id}`);
};

exports.folderGet = async (req, res) => {
  try {
    let folder = await db.folderGet(req.user.id, req.params.folderId);

    let folderPath = await db.folderPath(req.params.folderId);

    const buckets = await supabaseConn();

    console.log(buckets);

    res.render("folders", {
      folders: folder,
      files: folder.files,
      path: folderPath,
      formatDate,
    });
  } catch (err) {
    console.error("Error fetching folder", err);
    return res.status(500).render("error", {
      message: "Folder does not exist",
      status: 500,
    });
  }
};

exports.addFolderPost = async (req, res) => {
  let parentId = req.params.folderId;
  await db.folderCreate("New Folder", req.user.id, parentId);
  res.redirect(`/folder/${parentId}`);
};

exports.fileUpload = async (req, res) => {
  const files = req.files;

  for (const file of files) {
    console.log(file);
    await db.filePost(1, req.params.folderId, file.originalname, file.size);
  }

  res.redirect(`/folder/${req.params.folderId}`);
};

exports.itemDelete = async (req, res) => {
  await db.itemDelete(req.params.type, req.params.id);
  res.status(200).json({ message: `${req.params.type} deleted successfully!` });
};

exports.itemRename = async (req, res) => {
  await db.itemRename(req.params.type, req.params.id, req.body.itemName);
  res.redirect(req.get("referer"));
};
