const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// API PORT
const port = 6052;

// Start Express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Use middleware
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

// Begin Routing API
// Define Routes
app.use("/buzios", require("./routes/buzios"));
app.use("/portfolio", require("./routes/portfolio"));
app.use("/lavandaria", require("./routes/lavandaria"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
