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

exports.folderGetByPath = async (userId, path) => {
  return prisma.folder.findFirst({
    where: {
      userId: userId,
      path: path,
    },
  });
};

exports.folderGetChildrenByPath = async (userId, path) => {
  if (path === "/") {
    //Only get root folders
    return prisma.folder.findMany({
      where: {
        userId: userId,
        parentId: null,
      },
      orderBy: { createdAt: "asc" },
    });
  } else {
    //Get subfolders of parent
    const parentFolder = await prisma.folder.findFirst({
      where: {
        userId: userId,
        path: path,
      },
      orderBy: { createdAt: "asc" },
    });

    return prisma.folder.findMany({
      where: {
        userId: userId,
        parentId: parentFolder.id,
      },
      orderBy: { createdAt: "asc" },
    });
  }
};

exports.folderRename = async (userId, folderId, folderName) => {
  try {
    return prisma.folder.update({
      data: {
        name: folderName,
      },
      where: {
        userId,
        id: folderId,
      },
    });
  } catch (err) {
    console.error("Error renaming folder", err);
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
      where: { userId, folderId },
    });
  } catch (err) {
    console.error("Error getting file", err);
    throw err;
  }
};

exports.folderGet = async (userId, folderId) => {
  try {
    return prisma.folder.findFirst({
      where: { userId: userId, id: parseInt(folderId) },
      include: { parent: true, subFolders: true, files: true },
    });
  } catch (err) {
    console.error("Error getting folder2", err);
  }
};

exports.rootFolderGet = async (userId) => {
  try {
    const root = await prisma.folder.findFirst({
      where: { userId, parentId: null },
    });
    return root;
  } catch (err) {
    console.error("No root folder found", err);
  }
};
