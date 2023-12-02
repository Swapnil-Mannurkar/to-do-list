import { encryptPassword } from "@/lib/auth";
import { connectDatabase, credentialsCollection } from "../../../lib/db";

const handler = async (req, res) => {
  const method = req.method;

  if (method !== "POST") {
    res.status(422).json({ message: "Invalid request!", status: "failed" });
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password || password.length < 7) {
    res.status(422).json({ message: "Invalid inputs!", status: "failed" });
    return;
  }

  let client;

  try {
    client = await connectDatabase();

    const collection = await credentialsCollection(client);

    const existingUser = await collection.findOne({ _id: username });

    if (existingUser) {
      client.close();

      res.status(422).json({
        message: "Username already exists!",
        status: "failed",
      });

      return;
    }

    const encryptedPassword = await encryptPassword(password);

    await collection.insertOne({ _id: username, password: encryptedPassword });

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

export default handler;
