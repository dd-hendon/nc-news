const { selectArticleById } = require("../models/article");

exports.getArticleById = async (req, res, next) => {
  try {
    const article = await selectArticleById(req.params.article_id);
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};
