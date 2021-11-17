import http from "http";
import WebSocket from "ws";
import express from "express";
import { Socket } from "dgram";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req,res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);

// http , ws 서버 둘 다 작동시킬 수 있다. 
const wss = new WebSocket.Server({server});

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser ");
  socket.on("close", () => { console.log("Disconnected from Browser X "); })
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message));
  });
});

server.listen(3000, handleListen);
