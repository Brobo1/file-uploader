const db = require("../db/queries");
const formatDate = require("../scripts/util/date");
const { supabaseConn, supabase } = require("../scripts/util/supabase");

exports.rootGet = async (req, res) => {
  const userId = req.user.id;
  const root = await db.rootFolderGet(userId);

  res.redirect(`/folder/${root.id}`);
};

exports.folderGet = async (req, res) => {
  try {
    let folder = await db.folderGet(req.user.id, req.params.folderId);

    let folderPath = await db.folderPath(req.params.folderId);

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
  const user = req.user.id;

  for (const file of files) {
    const dbFile = await db.filePost(
      user,
      req.params.folderId,
      file.originalname,
      file.size,
    );
    console.log(file);
    await supabase.storage
      .from("users")
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
    console.log(allFiles);
    for (const file of allFiles) {
      await supabase.storage
        .from("users")
        .remove([`${file.userId}/${file.id}`]);
    }
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
    .from("users")
    .download(filePath);

  res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
  res.setHeader("Content-Type", data.type);

  const buffer = await data.arrayBuffer();
  res.send(Buffer.from(buffer));

  console.log(data);
};
