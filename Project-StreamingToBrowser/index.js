const videoHandler = require("./videoHandler");
const { createWriteStream } = require("fs");
const multiparty = require("multiparty");
const zedVideo = "./ZED HIGHLIGHT.mp4";
const express = require("express");
const app = express();

app.get("/video", videoHandler);

app.post("/", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req);
  form.on("part", part => {
    const name = part.name ? part.name : part.filename;
    const upload = createWriteStream(`upload/${name}`);
    part.pipe(upload);
  });
  form.on("close", () => {
    res.write(`
        <h1>Hello</h1>
        <video id="videoPlayer" controls>
            <source src="http://localhost:3000/video" type="video/mp4">
        </video>
    `);
  });
  res.writeHead(200, {
    "Content-Type": "text/html"
  });
});

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
        <form enctype="multipart/form-data" method="POST" action="/">
            First name:<br>
            <input type="text" name="firstname">
            <br>
            Last name:<br>
            <input type="text" name="lastname">
            <br><br>
            Video:<br>
            <input type="file" name="video"/>
            <button >Upload</button>
        </form>
    `);
});

app.listen(3000, () => {
  console.log("Server on PORT 3000");
});
