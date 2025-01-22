const db = require("../../db/queries");
const { fileSizeShortener } = require("./fileSize");
const formatDate = require("./date");
const { sortItems } = require("./sortItems");

exports.renderFolder = async (userId, folderId, res, sortBy, sortDir) => {
  try {
    let folder = await db.folderGet(userId, folderId);

    sortItems(folder, sortBy, sortDir);

    let folderPath = await db.folderPath(folderId);

    fileSizeShortener(folder);

    res.render("folders", {
      folders: folder,
      files: folder.files,
      path: folderPath,
      sortBy,
      sortDir,
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
