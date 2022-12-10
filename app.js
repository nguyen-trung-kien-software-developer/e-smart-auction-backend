const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const route = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());

const pathPublic = path.join(__dirname, "./public");
app.use(express.static(pathPublic));

route(app);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
