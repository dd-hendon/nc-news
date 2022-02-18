const db = require("../db/connection");

exports.selectArticles = async (queries) => {
  let { order, sort_by, topic } = queries;
  order = order || "DESC";
  sort_by = sort_by || "created_at";
  topic = topic || undefined;

  const allowedOrders = ["asc", "desc", "ASC", "DESC"];
  if (!allowedOrders.includes(order)) {
    return Promise.reject({ status: 400, message: "Invalid order query" });
  }
  const allowedSorts = [
    "title",
    "article_id",
    "topic",
    "author",
    "created_at",
    "votes",
  ];
  if (!allowedSorts.includes(sort_by)) {
    return Promise.reject({ status: 400, message: "Invalid sort query" });
  }

  let queryString = `
    SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes,
    CAST(COUNT(comments.article_id) AS INT)
    AS comment_count 
    FROM articles
    LEFT JOIN comments
    ON articles.article_id=comments.article_id `;

  if (topic) {
    queryString += `WHERE topic=$1 `;
  }

  queryString += `
    GROUP BY articles.article_id 
    ORDER BY ${sort_by} ${order};`;

  const articles = topic
    ? await db.query(queryString, [topic])
    : await db.query(queryString);

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
