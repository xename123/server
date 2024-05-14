const jwt = require("jsonwebtoken");
const { writeData } = require("../utils/data/parse.js");
const bcrypt = require("bcrypt");

const generateAccesToken = (username) => {
  return jwt.sign({ username }, "some-secret-key", {
    expiresIn: "24h",
  });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = req.usersArray.find((item) => item.email === req.body.email);

    if (user) {
      return res.status(400).json({ message: "Registration error" });
    }

    await writeData("./data/users.json", [
      ...req.usersArray,
      { username, email, password: hashPassword },
    ]);
    res.json({ message: "Create user" });
  } catch (e) {
    res.status(400).json({ message: "Registration error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = req.usersArray.find((item) => item.email === email);
    if (!user) {
      return res.status(400).json({ message: "Login error" });
    }

    const validePassword = bcrypt.compareSync(password, user.password);
    if (!validePassword) {
      return res.status(400).json({ message: "Invalid data" });
    }
    const token = generateAccesToken(user.username);
    return res.status(200).json({ token, username: user.username, password });
  } catch (e) {
    return res.status(400).json({ message: "Login error" });
  }
};

const getMe = async (req, res) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }
    jwt.verify(token, "some-secret-key", (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Invalid authentication token" });
      }
      const user = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
      };
      res.json({ user });
    });
  } catch (e) {
    return res.status(400).json({ message: "Auth error" });
  }
};
module.exports = { register, login, getMe };
