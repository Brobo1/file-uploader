const db = require("../db/queries");
const formatDate = require("../scripts/util/date");
const { supabase } = require("../scripts/util/supabase");
const { TextDecoder } = require("util");
const { fileSizeShortener } = require("../scripts/util/fileSize.js");
const { renderFolder } = require("../scripts/util/renderFolder.js");

const STORAGE_BUCKET =
  process.env.NODE_ENV === "dev" ? "users-dev" : "users-prod";

exports.rootGet = async (req, res) => {
  try {
    const userId = req.user.id;
    const root = await db.rootFolderGet(userId);

    await renderFolder(userId, root.id, res);
  } catch (err) {
    console.error("Unable to get root folder", err);
  }
};

exports.folderGet = async (req, res) => {
  try {
    let folder = await db.folderGet(req.user.id, req.params.folderId);

    await renderFolder(req.user.id, folder.id, res);
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
  await renderFolder(req.user.id, parentId, res);
};

exports.fileUpload = async (req, res) => {
  const files = req.files;
  const user = req.user.id;

  for (const file of files) {
    //Decode filename as utf8 to allow special chars
    const fileName = new TextDecoder("utf8").decode(
      Buffer.from(file.originalname, "binary"),
    );

    const splitFileName = fileName.split(".");

    //Save metadata to db
    const dbFile = await db.filePost(
      user,
      req.params.folderId,
      splitFileName[0],
      splitFileName[1],
      file.size,
    );

    // Save file to supabase
    await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(`${user}/${dbFile.id}`, file.buffer, {
        upsert: false,
        contentType: file.mimetype,
      });
  }

  res.redirect(`/folder/${req.params.folderId}`);
};

exports.itemDelete = async (req, res) => {
  const { type, id } = req.params;

  if (type === "folder") {
    const allFiles = await db.getAllFilesInFolder(id);
    for (const file of allFiles) {
      await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([`${file.userId}/${file.id}`]);
    }
  } else if (type === "file") {
    await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([`${req.user.id}/${id}`]);
  }

  await db.itemDelete(type, id);
  res.status(200).json({ message: `${req.params.type} deleted successfully!` });
};

exports.itemRename = async (req, res) => {
  await db.itemRename(req.params.type, req.params.id, req.body.itemName);
  res.redirect(req.get("referer"));
};

exports.fileDownload = async (req, res) => {
  const fileId = req.params.fileId;
  const filePath = `${req.user.id}/${fileId}`;
  const file = await db.fileGet(fileId);

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .download(filePath);

  console.log();
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${file.name}.${file.extension}"`,
  );
  res.setHeader("Content-Type", data.type);

  const buffer = await data.arrayBuffer();
  res.send(Buffer.from(buffer));
};
