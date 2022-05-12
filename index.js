const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const url = require('url');
const { Server } = require("ws");

const server = express()
    .use(express.static(path.join(__dirname, "public")))        // Make files in public folder available
    //.use("/data", data)                                         // Use instructions in data.js at url: <your-app-name>.herokuapp.com/data
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
    

const wss = new Server({noServer: true});
require("./websockets/climate.js")(wss);

const wss2 = new Server({noServer: true});
require("./websockets/shelfs.js")(wss2);

server.on("upgrade", (request, socket, head) => {
    const pathname = url.parse(request.url).pathname;
    console.log(pathname);

    if (pathname === "/") {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws, request);
        });
    } else if (pathname === "/data") {
        wss2.handleUpgrade(request, socket, head, (ws) => {
            wss2.emit("connection", ws, request);
        });
    } else {
        socket.destroy();
    }
});