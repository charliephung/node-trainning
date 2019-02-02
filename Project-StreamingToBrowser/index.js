const express = require("express");
const { stat, createReadStream } = require("fs");
const { promisify } = require("util");
const video = "./ZED HIGHLIGHT.mp4";
const app = express();
const fileInfo = promisify(stat);

app.get("/", async (req, res) => {
  const { size } = await fileInfo(video);
  const { range } = req.headers;

  if (range) {
    let [start, end] = range.replace(/bytes=/g, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4"
    });
    createReadStream(video, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": size,
      "Content-Type": "video/mp4"
    });
    createReadStream(video).pipe(res);
  }
});

app.listen(3000, () => {
  console.log("Server on PORT 3000");
});
