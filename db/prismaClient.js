const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.SUPABASE_MIG_STRING, // directUrl
    },
  },
});

module.exports = { prisma };
