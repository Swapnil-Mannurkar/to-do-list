import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const method = req.method;

  if (method !== "POST") {
    res.status(422).json({ message: "Something went wrong!" });
  }

  const task = req.body.task;
  const username = req.body.username;

  let client;
  try {
    client = await MongoClient.connect(
      "mongodb+srv://swapnil:mannurkar@to-do-list.vx4lldn.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (error) {
    res
      .status(422)
      .json({ message: "Couldn't connect Database!", status: "failed" });
    return;
  }

  try {
    const collection = await client.db("list-of-events").collection(username);
    await collection.insertOne({ task: task, status: false });

    client.close();
    res
      .status(201)
      .json({ message: "Successfully add a new task", status: "success" });
  } catch (error) {
    client.close();
    res
      .status(422)
      .json({ message: "Couldn't connect Database!", status: "failed" });
    return;
  }
};

export default handler;
