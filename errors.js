exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Invalid input" });
  } else if (err.code === "23502") {
    res.status(400).send({ message: "Missing required data" });
  } else if (err.code === "23503") {
    res.status(404).send({ message: "Related resource does not exist" });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: `Internal server error: ${err}` });
};
