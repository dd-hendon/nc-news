const { selectCommentsByArticleId } = require("../models/comment");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const id = req.params.article_id;
    const comments = await selectCommentsByArticleId(id);
    res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
};
