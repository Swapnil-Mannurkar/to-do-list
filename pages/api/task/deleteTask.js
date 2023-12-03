import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const method = req.method;

  if (method !== "DELETE") {
    res.status(422).json({ message: "Invalid request!" });
    return;
  }

  const task = req.body.task;
  const username = req.body.username;

  let client;
  try {
    client = await MongoClient.connect(
      "mongodb+srv://swapnil:mannurkar@to-do-list.vx4lldn.mongodb.net/<YOUR_DATABASE_NAME>?retryWrites=true&w=majority"
    );
  } catch (error) {
    res
      .status(422)
      .json({ message: "Couldn't connect to the database!", status: "failed" });
    return;
  }

  try {
    const collection = client.db("list-of-events").collection(username);

    const result = await collection.deleteOne({ task: task });

    if (result.deletedCount === 1) {
      res
        .status(200)
        .json({ message: "Successfully deleted the task", status: "success" });
    } else {
      res.status(404).json({ message: "Task not found", status: "failed" });
    }

    client.close();
  } catch (error) {
    client.close();
    res.status(422).json({ message: "Failed to delete!", status: "failed" });
  }
};

export default handler;
