const { selectArticleById, updateArticleById } = require("../models/article");

exports.getArticleById = async (req, res, next) => {
  try {
    const article = await selectArticleById(req.params.article_id);
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.patchArticleById = async (req, res, next) => {
  try {
    const id = req.params.article_id;
    const votesUpdate = req.body.inc_votes;
    const article = await updateArticleById(id, votesUpdate);
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};
