import { connectDatabase, taskCollection } from "@/lib/db";

const handler = async (req, res) => {
  const method = req.method;

  if (method === "PATCH" || method === "POST" || method === "DELETE") {
    const taskName = req.body.task;
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

      if (method === "POST") {
        await collection.insertOne({ task: taskName, status: false });
      }

      if (method === "PATCH") {
        const taskStatus = req.body.status;

        await collection.updateOne(
          { task: taskName },
          { $set: { status: taskStatus } }
        );
      }

      if (method === "DELETE") {
        const result = await collection.deleteOne({ task: taskName });

        if (result.deletedCount === 0) {
          res.status(404).json({ message: "Task not found", status: "failed" });
        }
      }
      client.close();
      res
        .status(201)
        .json({ message: "Successfully updated the task", status: "success" });
    } catch (error) {
      client.close();
      res.status(422).json({ message: "Failed to update!", status: "failed" });
      return;
    }
  } else {
    res.status(422).json({ message: "Invalid request!" });
  }
};

export default handler;
