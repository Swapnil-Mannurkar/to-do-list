import { connectDatabase, taskCollection } from "@/lib/db";

const handler = async (req, res) => {
  const method = req.method;

  if (method !== "POST") {
    res.status(422).json({ message: "Something went wrong!" });
  }

  const task = req.body.task;
  const username = req.body.username;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res
      .status(422)
      .json({ message: "Couldn't connect Database!", status: "failed" });
    return;
  }

  try {
    const collection = await taskCollection(client, username);
    await collection.insertOne({ task: task, status: false });

    client.close();
    res
      .status(201)
      .json({ message: "Successfully add a new task!", status: "success" });
  } catch (error) {
    client.close();
    res.status(422).json({ message: "Failed to add task!", status: "failed" });
    return;
  }
};

export default handler;
