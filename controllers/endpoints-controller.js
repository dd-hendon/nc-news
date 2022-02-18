const endpoints = require("../endpoints.json");

exports.getEndpoints = async (req, res, next) => {
  try {
    await res.status(200).send({ endpoints });
  } catch (err) {
    next(err);
  }
};
