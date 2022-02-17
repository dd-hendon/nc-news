const db = require("../db/connection");

exports.selectArticles = async () => {
  const articles = await db.query(
    `
    SELECT article_id, title, topic, author, created_at, votes 
    FROM articles 
    ORDER BY created_at DESC;`
  );
  return articles.rows;
};

exports.selectArticleById = async (id) => {
  const article = await db.query(
    `
    SELECT articles.*, 
    CAST(COUNT(comments.article_id) AS INT) 
    AS comment_count
    FROM articles 
    LEFT JOIN comments 
    ON articles.article_id=comments.article_id 
    WHERE articles.article_id = $1 
    GROUP BY articles.article_id;`,
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
