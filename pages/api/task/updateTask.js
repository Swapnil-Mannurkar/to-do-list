import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const method = req.method;

  if (method !== "PATCH") {
    res.status(422).json({ message: "Invalid request!" });
  }

  const taskName = req.body.task;
  const taskStatus = req.body.status;
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
    const collection = client.db("list-of-events").collection(username);

    await collection.updateOne(
      { task: taskName },
      { $set: { status: taskStatus } }
    );

    client.close();
    res
      .status(201)
      .json({ message: "Successfully updated the task", status: "success" });
  } catch (error) {
    client.close();
    res.status(422).json({ message: "Failed to update!", status: "failed" });
    return;
  }
};

export default handler;
