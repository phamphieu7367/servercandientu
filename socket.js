const express = require("express");
const http = require("http");
const mqtt = require("mqtt");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  const client = mqtt.connect("mqtt://broker.hivemq.com");
  client.on("connect", function () {
    console.log("Client subscribed ");
    client.subscribe("canGroup/dulieu/#");
    client.on("message", function (topic, message) {
      if (topic === "canGroup/dulieu/kg") {
        console.log("topic ", topic);
        socket.emit("receive_scale", message.toString());
      }
    });
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
