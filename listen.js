const app = require("./app");

const PORT = process.env.PORT || 9090;
console.log(PORT);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});
