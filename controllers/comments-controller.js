const {
  selectCommentsByArticleId,
  createComment,
  removeComment,
} = require("../models/comment");
const { checkResourceExists } = require("../db/helpers/utils");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const id = req.params.article_id;
    await checkResourceExists("articles", "article_id", [id]);
    const comments = await selectCommentsByArticleId(id);
    res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
};

exports.postCommentToArticleId = async (req, res, next) => {
  try {
    const id = req.params.article_id;
    const comment = req.body;
    const createdComment = await createComment(comment, id);
    res.status(201).send({ createdComment });
  } catch (err) {
    next(err);
  }
};

exports.deleteCommentById = async (req, res, next) => {
  try {
    const id = req.params.comment_id;
    await removeComment(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
