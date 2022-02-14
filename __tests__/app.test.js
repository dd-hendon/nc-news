const testData = require("../db/data/test-data");

const seed = require("../db/seeds/seed");

const app = require("../app");

const request = require("supertest");

describe("app", () => {
  describe("On invalid path", () => {
    test("Status 404 - Path not found ", () => {
      return request(app)
        .get("/api/invalid-endpoint")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toEqual("Path not found");
        });
    });
  });
});
