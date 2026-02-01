import express from "express";
import {createServer} from "http";
import type {Socket} from "socket.io";
import {Server} from "socket.io";

const app = express();

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket: Socket) => {
  console.log("connected", socket.id);
  socket.on("audio-chunk", (chunk: object) => {
    console.log(chunk);
  });

  socket.on("disconncet", (socket: Socket) =>
    console.log("disconnected", socket.id),
  );
});

server.listen(8080, () => console.log("Server running on port 8080"));
