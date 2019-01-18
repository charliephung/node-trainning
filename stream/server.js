const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(`${req.method} request for ${req.url}`);
  if (req.url === "/") {
    // Read html file asynchronous
    // Write header file 200 status
    // text/html
    // send html
    fs.readFile("./bitcoin.html", "UTF-8", (err, html) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    });
  } else if (req.url.match(/.css$/)) {
    // Create stream
    // res is a writable stream
    // use pipe to write to it
    console.log(__dirname, "public", req.url);

    const cssPath = path.join(__dirname, "public", req.url);
    const fileStream = fs.createReadStream(cssPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);
  } else if (req.url.match(/.jpg$/)) {
    // Create stream
    const imgPath = path.join(__dirname, "public", req.url);
    const imgStream = fs.createReadStream(imgPath);
    res.writeHead(200, { "Content-Type": "img/jpg" });
    imgStream.pipe(res);
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("404 File Not Found");
  }
});

server.listen(3000);
console.log("Server listening on port 3000");
