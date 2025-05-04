const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_MIGRATION_URL,
    },
  },
});

module.exports = { prisma };
