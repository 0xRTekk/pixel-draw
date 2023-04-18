import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { db } from "./mongo-client.js";
import * as dotenv from "dotenv";
dotenv.config();

// Interfaces TS
interface Pixel {
  cellIndex: number;
  color: string;
}

// Create express app
const app = express();

// Create serveur from express app
const server = createServer(app);

// Create websocket server from http server
const io = new Server(server);

// Serve client built folder
app.use(express.static("client/dist"));

// Config websocket connections
io.on("connection", async (socket) => {
  console.log("Une connexion au serveur websocket a été ouverte");

  // On recup tous les pixels de la DB
  const allPixels = await db.collection("pixels").find().toArray();
  // Puis on les envois au client qui vient de se connecter
  socket.emit("pixels", allPixels);

  // Se mettre en écoute des différents events envoyés depuis les clients
  socket.on("pixel", async (pixel: Pixel) => {
    console.log(`[BACK] - On recoit le pixel du front : ${pixel.cellIndex} - ${pixel.color}`);

    // 1. On enregitsre en DB
    await db.collection("pixels").insertOne(pixel);

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
