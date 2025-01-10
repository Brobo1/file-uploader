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

exports.folderCreate = async (name, userId, parentId = null) => {
  let path;
  if (parentId) {
    const parent = await prisma.folder.findFirst({
      where: { id: parentId },
    });
    path = `${parent.path}/${name}`;
  } else {
    path = `/${name}`;
  }
  await prisma.folder.create({
    data: {
      name: name,
      path: path,
      userId: userId,
      parentId: parentId,
    },
  });
};

exports.folderGet = async (userId) => {
  return prisma.folder.findMany({
    select: {
      name: true,
      path: true,
    },
    where: { userId: userId },
  });
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

exports.folderChangeName = async (userId, folderId, folderName) => {
  await prisma.$transaction(async (prisma) => {
    const originalFolder = await prisma.folder.findFirst({
      where: { id: folderId, userId: userId },
    });

    if (!originalFolder) {
      return; // Or throw an error
    }

    const originalPath = originalFolder.path;
    const newFolderPath =
      originalPath.substring(0, originalPath.lastIndexOf("/") + 1) + folderName; // Construct new path

    const children = await prisma.folder.findMany({
      where: {
        path: { startsWith: originalPath + "/" }, // Only direct children
        userId: userId,
      },
    });

    // Update renamed folder
    await prisma.folder.update({
      where: { id: folderId },
      data: { name: folderName, path: newFolderPath },
    });

    for (const child of children) {
      const updatedPath = child.path.replace(
        originalPath + "/",
        newFolderPath + "/",
      );
      await prisma.folder.update({
        where: { id: child.id },
        data: { path: updatedPath },
      });
    }
  });
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

exports.folderGet2 = async (userId, folderId) => {
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
