const res = require("express/lib/response");
const { selectTopics } = require("../models/models.topics");

exports.getTopics = async (req, res) => {
  const topics = await selectTopics();
  res.status(200).send({ topics });
};
