const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(function(req, res, next) {
  console.log(`${req.method} request for ${req.url}`);
  next();
});
app.use(express.static("./public"));

app.listen(3000, () => {
  console.log("Server on PORT " + 3000);
});

module.exports = app;
