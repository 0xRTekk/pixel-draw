import express from "express";
import { createServer } from "node:http";
import * as dotenv from "dotenv";
dotenv.config();

// Create express app
const app = express();

// Create serveur from express app
const server = createServer(app);

// Serve client built folder
app.use(express.static("client/dist"));

// Middlewares
app.get("/", (req, res) => {
  res.send("Hello Starship");
});

// Server start
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
