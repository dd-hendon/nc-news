const express = require("express");
const { getTopics } = require("./controllers/controllers.topics");

const app = express();

app.get("/api/topics", getTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Path not found" });
});

module.exports = app;
