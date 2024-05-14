const apiRouter = require("express").Router();

const authRouter = require("./auth");
const drinksRouter = require("./drinks");

apiRouter.use("/api", drinksRouter);
apiRouter.use("/api", authRouter);

module.exports = apiRouter;
