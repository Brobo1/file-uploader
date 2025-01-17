const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { prisma } = require("./db/prismaClient");
const app = express();
const path = require("node:path");
const passport = require("passport");
const initPassport = require("./config/passport").initPass;
const indexRouter = require("./routes/indexRouter");
const folderRouter = require("./routes/folderRoutes");
const { isAuth } = require("./scripts/util/auth");

initPassport(passport);

app.set("view engine", "ejs");

app.use(
  session({
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/folder", isAuth, folderRouter);

process.on("SIGINT", async () => {
  prisma.$disconnect();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  prisma.$disconnect();
  process.exit(0);
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
