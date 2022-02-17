const db = require("../db/connection");
const { checkResourceExists } = require("../db/helpers/utils");

exports.selectCommentsByArticleId = async (id) => {
  const comments = await db.query(
    "SELECT * FROM comments WHERE article_id = $1",
    [id]
  );
  if (comments.rows.length === 0) {
    await checkResourceExists("articles", "article_id", [id]);
  }
  return comments.rows;
};
