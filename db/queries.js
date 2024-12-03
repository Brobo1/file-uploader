const { prisma } = require("./prismaClient");
const bcrypt = require("bcryptjs");

exports.userSignup = async (username, password) => {
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    await prisma.user.create({
      data: { username: username, password: hashedPassword },
    });
  });
};
