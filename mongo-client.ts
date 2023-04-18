import { Db, MongoClient } from "mongodb";

export let db: Db;

const client = new MongoClient(process.env.MONGO_URI || "mongodb://localhost:27017");

client.connect().then(() => {
  db = client.db("odraw-starship");
});
