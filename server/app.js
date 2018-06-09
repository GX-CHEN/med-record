// This file loads the database and
// route the express with operations

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes/routes";
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

export default app;
