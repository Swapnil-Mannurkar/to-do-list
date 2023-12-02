import { connectDatabase, credentials } from "./db";

export default handler = async (req, res) => {
  const method = req.method;
  const username = req.body.username;
  const password = req.body.password;

  if (method !== "POST") {
    res.status(422).json({ message: "Invalid request!", status: "failed" });
    return;
  }

  if (!username || !password || password.length < 7) {
    res.status(422).json({ message: "Invalid inputs!", status: "failed" });
    return;
  }

  let client;

  try {
    client = await connectDatabase();

    const collection = await credentials(client);

    const existingUser = await collection.findOne({ _id: username });

    if (existingUser) {
      client.close();

      res.status(422).json({
        message: "Username already exists!",
        status: "failed",
      });

      return;
    }

    await collection.insertOne({ _id: username, password });

    client.close();
    res.status(201).json({ message: "User created!", status: "success" });

    return;
  } catch (error) {
    if (client) {
      client.close();
    }

    res.status(422).json({
      message: "Something went wrong, Try again later!",
      status: "failed",
    });

    return;
  }
};
