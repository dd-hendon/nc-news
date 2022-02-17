const db = require("../db/connection");

exports.selectCommentsByArticleId = async (id) => {
  const comments = await db.query(
    "SELECT * FROM comments WHERE article_id = $1",
    [id]
  );
  return comments.rows;
};
