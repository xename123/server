const { readData } = require("../utils/data/parse");
const findAllUsers = async (req, res, next) => {
  req.usersArray = await readData("./data/users.json");
  next();
};
module.exports = { findAllUsers };
