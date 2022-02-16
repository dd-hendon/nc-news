const db = require("../db/connection");

exports.selectArticleById = async (id) => {
  const article = await db.query(
    "SELECT * FROM articles WHERE article_id = $1;",
    [id]
  );
  if (article.rows[0] === undefined) {
    return Promise.reject({
      status: 404,
      message: `No resource found for article_id: ${id}`,
    });
  }
  return article.rows[0];
};

exports.updateArticleById = async (id, votesUpdate) => {
  const article = await db.query(
    `
    UPDATE articles
    SET votes = votes + $2
    WHERE article_id = $1
    RETURNING *;
    `,
    [id, votesUpdate]
  );
  return article.rows[0];
};
