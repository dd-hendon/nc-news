const express = require("express");

const app = express();

app.all("/*", (req, res) => {
  res.status(404).send({ message: "Path not found" });
});

module.exports = app;
