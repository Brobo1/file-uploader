const { prisma } = require("./prismaClient");
const bcrypt = require("bcryptjs");
const { userLogoutGet } = require("../controllers/indexController");

exports.userSignup = async (username, password) => {
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        folders: {
          create: {
            name: "root",
          },
        },
      },
    });
  });
};

exports.rootFolderGet = async (userId) => {
  try {
    return await prisma.folder.findFirst({
      where: {
        userId,
        parentId: null,
      },
    });
  } catch (err) {
    console.error("No root folder found", err);
  }
};

exports.folderGet = async (userId, folderId) => {
  try {
    return prisma.folder.findFirst({
      where: {
        userId: userId,
        id: parseInt(folderId),
      },
      include: {
        parent: true,
        subFolders: true,
        files: true,
      },
    });
  } catch (err) {
    console.error("Error getting folder2", err);
  }
};

exports.folderCreate = async (name, userId, parentId) => {
  try {
    return prisma.folder.create({
      data: {
        name: name,
        userId: userId,
        parentId: parseInt(parentId),
      },
    });
  } catch (err) {
    console.error("Error creating folder", err);
  }
};

exports.folderDelete = async (userId, folderId) => {
  await prisma.folder.delete({
    where: {
      id: folderId,
      userId: userId,
    },
  });
};

exports.fileGet = async (userId, folderId) => {
  try {
    return prisma.file.findMany({
      where: {
        userId,
        folderId,
      },
    });
  } catch (err) {
    console.error("Error getting file", err);
    throw err;
  }
};

exports.filePost = async (userId, folderId, fileName, size) => {
  try {
    return prisma.file.create({
      data: {
        name: fileName,
        folderId: parseInt(folderId),
        size,
      },
    });
  } catch (err) {
    console.error("Error uploading file", err);
  }
};

exports.fileDelete = async (userId, fileId, folderId) => {
  try {
    return prisma.folder.update({
      where: {
        id: parseInt(folderId),
        userId: parseInt(userId),
      },
      data: {
        files: {
          delete: {
            id: parseInt(fileId),
          },
        },
      },
    });
  } catch (err) {
    console.error("Error deleting file", err);
  }
};

exports.itemRename = async (type, id, name) => {
  try {
    return prisma[type === "folder" ? "folder" : "file"].update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
  } catch (err) {
    console.error(`Error renaming ${type}`, err);
  }
};

exports.itemDelete = async (type, id) => {};
