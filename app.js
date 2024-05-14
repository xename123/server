const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./routes/apiRouter");

const PORT = 3001;
const app = express();

app.use(
  cors(),
  bodyParser.json(),
  apiRouter,
  express.static(path.join(__dirname, "public"))
);

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
