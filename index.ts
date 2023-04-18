import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.static("client/dist")); // On sert les fichiers build de notre front

app.get("/", (req, res) => {
  res.send("Hello Starship");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
