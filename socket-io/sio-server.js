const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app).listen(3000);
const io = require("socket.io");
const ioServer = io(server);

app.use(express.static("./public"));

ioServer.on("connection", socket => {
  socket.on("chat", msg => {
    socket.broadcast.emit("message", msg);
  });

  socket.emit("message", "Welcome to Cyber Chat");
});

console.log("Server on Port 3000");
