import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const method = req.method;
  const username = req.body.username;
  const password = req.body.password;

  if (method !== "POST") {
    res.status(422).json({ message: "Invalid request!" });
  }

  const client = await MongoClient.connect(
    "mongodb+srv://swapnil:todolist@to-do-list.vx4lldn.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("users");

  const collection = db.collection("credentials");

  await collection.insertOne({ _id: username, password });

  client.close();

  res.status(201).json({ message: "User created!" });
};

export default handler;
