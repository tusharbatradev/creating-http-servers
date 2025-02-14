const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: New Request Recieved\n`;
  fs.appendFile("log.text", log, (err, data) => {
    res.end("Hello From Server again");
  });
  console.log(req);
  res.end("Hello from Server");
});

myServer.listen(8000, () => console.log("Server Started"));
