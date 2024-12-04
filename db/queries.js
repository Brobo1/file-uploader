const { prisma } = require("./prismaClient");
const bcrypt = require("bcryptjs");

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

exports.folderCreate = async (userId, parentId = null) => {
  let path = "";
  await prisma.folder.create({
    data: {
      name: "New Folder",
      path: path,
      userId: userId,
      parentId: parentId,
    },
  });
};

exports.folderGet = async (userId) => {
  return prisma.folder.findMany({
    select: { name: true },
    where: { userId: userId },
  });
};
