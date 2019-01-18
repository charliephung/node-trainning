const https = require("https");
const fs = require("fs");

const options = {
  hostname: "en.wikipedia.org",
  port: 443,
  path: "/wiki/Bitcoin",
  method: "GET"
};

const req = https.request(options, res => {
  var resbody = "";
  console.log("Response from server started.");
  console.log(`Server Status ${res.statusCode}`);
  console.log(`Response Header %j` ,res.headers);
  res.setEncoding("UTF-8");

  res.once("data", chunk => {
    console.log(chunk);
  });
  res.on("data", chunk => {
    console.log(`--chunk-- ${chunk.length}`);
    resbody += chunk;
  });
  res.on("end", () => {
    fs.writeFile("bitcoin.html", resbody, err => {
      if (err) {
        throw err;
      }
      console.log("File downloaded");
    });
  });
});

req.on("err", err => {
  console.log(`Resuest error ${err.message}`);
});

req.end();
