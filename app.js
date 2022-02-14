const express = require("express");
const { getTopics } = require("./controllers/controllers.topics");
const { check500 } = require("./errors");

const app = express();

app.get("/api/topics", getTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Path not found" });
});

app.use(check500);

module.exports = app;
