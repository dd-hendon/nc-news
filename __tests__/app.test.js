const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");

beforeEach(() => seed(testData));

afterAll(() => connection.end());

describe("app", () => {
  describe("INVALID PATH", () => {
    test("Status 404 - Path not found ", () => {
      return request(app)
        .get("/api/invalid-endpoint")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toEqual("Path not found");
        });
    });
  });
  describe("GET /api/topics", () => {
    test("Status 200 - Responds with an array of objects with expected length", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).toHaveLength(3);
        });
    });
    test("Status 200 - Responds with an array of objects with correct properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("GET /api/articles/:article_id", () => {
    test("Status 200 - Responds with a single requested object", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(typeof article).toBe("object");
        });
    });
    test("Status 200 - Selected article has correct properties and values", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: 1,
              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              body: "I find this existence challenging",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 100,
            })
          );
        });
    });
    test("Status 404 - Responds with message to a valid but nonexistent id", () => {
      return request(app)
        .get("/api/articles/77777")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("No resource found for article_id: 77777");
        });
    });
    test("Status 400 - Responds with message to an invalid id request", () => {
      return request(app)
        .get("/api/articles/invalidIdType")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Invalid input");
        });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    test("Status 200 - Responds with updated article with incremented votes", () => {
      const articleUpdate = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/1")
        .send(articleUpdate)
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: 1,
              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              body: "I find this existence challenging",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 101,
            })
          );
        });
    });
    test("Status 200 - Responds with updated article with decremented votes", () => {
      const articleUpdate = { inc_votes: -1 };
      return request(app)
        .patch("/api/articles/1")
        .send(articleUpdate)
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: 1,
              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              body: "I find this existence challenging",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 99,
            })
          );
        });
    });
    test("Status 400 - No inc_votes on request body", () => {
      return request(app)
        .patch("/api/articles/1")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Missing required data");
        });
    });
    test("Status 400 - Invalid input type of votes", () => {
      const articleUpdate = { inc_votes: "string" };
      return request(app)
        .patch("/api/articles/1")
        .send(articleUpdate)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Invalid input");
        });
    });
  });
  describe("GET /api/users", () => {
    test("Status 200 - Responds with an array of users of expected length", () => {
      return request(app)
        .get("/api/users")
        .then(({ body: { users } }) => {
          expect(users).toHaveLength(4);
        });
    });
    test("Status 200 - Users have expected properties", () => {
      return request(app)
        .get("/api/users")
        .then(({ body: { users } }) => {
          users.forEach((user) => {
            expect(user).toEqual(
              expect.objectContaining({
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("GET /api/articles", () => {
    test("Status 200 - Responds with an array of articles of expected length", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).toHaveLength(12);
        });
    });
    test("Status 200 - Articles have expected properties", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
              })
            );
          });
        });
    });
    test("Status 200 - Articles are sorted in descending date order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).toBeSortedBy("created_at", { descending: true });
        });
    });
  });
});
