const express = require("express");
const { stat, createReadStream } = require("fs");
const { promisify } = require("util");
const video = "./ZED HIGHLIGHT.mp4";
const app = express();
const fileInfo = promisify(stat);

app.get("/", async (req, res) => {
  const { size } = await fileInfo(video);
  res.writeHead(200, {
    "Content-Length": size,
    "Content-Type": "video/mp4"
  });
  createReadStream(video).pipe(res);
});

app.listen(3000, () => {
  console.log("Server on PORT 3000");
});
