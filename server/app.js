// This file loads the database and
// route the express with operations

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const app = express();

mongoose.Promise = global.Promise;

// connect to the dev database during run
// NODE_ENV is set at run time
if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/clinical");
}

// equip the middleware before routes
app.use(cors());
app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
  // 422 is unprocessable entity
  res.status(422).send({ error: err.message });
});

module.exports = app;
