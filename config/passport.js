const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcryptjs");
const { prisma } = require("../db/prismaClient");

exports.initPass = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await prisma.user.findFirst({
          where: { username: username },
        });

        if (!user) {
          console.log("Incorrect username");
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          console.log("Incorrect password");
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }),
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findFirst({ where: { id: id } });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
