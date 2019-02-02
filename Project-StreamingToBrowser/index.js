const express = require("express");
const { createReadStream } = require("fs");
const video = "./ZED HIGHLIGHT.mp4";
const app = express();

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "video/mp4" });
  createReadStream(video).pipe(res);
});

app.listen(3000, () => {
  console.log("Server on PORT 3000");
});
