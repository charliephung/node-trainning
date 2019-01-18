const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", ws => {
  ws.on("message", msg => {
    if (msg === "exit") ws.close();
    else {
      wss.clients.forEach(clientWs => {
        clientWs.send(msg);
      });
    }
  });

  ws.send("Welcome to Server");
});
