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

exports.folderPath = async (folderId) => {
  try {
    return prisma.$queryRaw`
        with recursive folder_path AS(
        select id, name, "parentId"
        from "Folder"
        where id = ${parseInt(folderId)}
        union all
        select f.id, f.name, f."parentId"
        from "Folder" as f
        inner join folder_path fp on fp."parentId" = f.id
        )
        select * from folder_path order by id;
      `;
  } catch (err) {
    console.error("Error getting path", err);
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

exports.filePost = async (userId, folderId, fileName, size) => {
  try {
    const file = prisma.file.create({
      data: {
        name: fileName,
        folderId: parseInt(folderId),
        size,
        storePath: ".",
      },
    });
  } catch (err) {
    console.error("Error uploading file", err);
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

exports.itemDelete = async (type, id) => {
  try {
    return prisma[type === "folder" ? "folder" : "file"].delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (err) {
    console.error(`Error deleting ${type}`, err);
  }
};

exports.getAllFilesInFolder = async (folderId) => {
  return prisma.file.findMany({
    where: {
      OR: [
        { folderId: parseInt(folderId) },
        { folder: { parentId: parseInt(folderId) } },
      ],
    },
  });
};
