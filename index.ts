import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
dotenv.config();

// Create express app
const app = express();

// Create serveur from express app
const server = createServer(app);

// Create websocket server from http server
const io = new Server(server);

// Serve client built folder
app.use(express.static("client/dist"));

// Config websocket connections
io.on("connection", (socket) => {
  console.log("Une connexion au serveur websocket a été ouverte");

  // Se mettre en écoute des différents events envoyés depuis les clients
  socket.on("pixel", (pixel) => {
    console.log(`[BACK] - On recoit le pixel du front : ${pixel.cellIndex} - ${pixel.color}`);

    // 1. On enregitsre en DB

    // 2. Dispatcher aux clients le nouveau pixel pour qu'ils se mettent à jour
    io.emit("pixel", pixel);
  });

  // Dispatcher/Emettre les différents events aux clients
});

// Server start
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
