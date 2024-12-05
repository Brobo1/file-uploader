const { prisma } = require("./prismaClient");
const bcrypt = require("bcryptjs");
const { userLogoutGet } = require("../controllers/indexController");

exports.userSignup = async (username, password) => {
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
  });
};

exports.folderCreate = async (name, userId, parentId = null) => {
  let path = "/";
  if (parentId) {
    const parent = await prisma.folder.findFirst({
      where: { id: parentId },
    });
    path += `${parent.name}/${name}`;
  } else {
    path += name;
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
    select: { name: true, path: true },
    where: { userId: userId },
  });
};

exports.folderGetSpecific = async (userId, path) => {
  if (path === "/") {
    //Only get root folders
    return prisma.folder.findMany({
      where: {
        userId: userId,
        parentId: null,
      },
    });
  } else {
    //Get subfolders of parent
    return prisma.folder.findMany({
      where: {
        userId: userId,
        path: { startsWith: `${path}/` },
      },
    });
  }
};
