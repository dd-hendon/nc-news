const devData = require("../data/development-data/index.js");
const testData = require("../data/test-data/index.js");
const seed = require("./seed.js");
const db = require("../connection.js");

const ENV = process.env.NODE_ENV || "development";

const data = {
  development: devData,
  test: testData,
};

const runSeed = () => {
  return seed(data[ENV]).then(() => db.end());
};

runSeed();
