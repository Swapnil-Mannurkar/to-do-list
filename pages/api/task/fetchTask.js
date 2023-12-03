import {
  connectDatabase,
  credentialsCollection,
  taskCollection,
} from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(403).json({ message: "Unauthorized user!", status: "failed" });
    return;
  }

  const username = session.user.name;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res
      .status(422)
      .json({ message: "Something went wrong!", status: "failed" });
    return;
  }

  let collection;

  try {
    collection = await taskCollection(client, username);
  } catch (error) {
    client.close();
    res.status(422).json({ message: "User not found!", status: "failed" });
    return;
  }

  try {
    const result = await collection.find({}).toArray();

    if (result.length === 0) {
      res.status(422).json({ message: "No data found!", status: "failed" });
      client.close();
      return;
    }

    res.status(200).json({ result, status: "success" });
    client.close();
  } catch (error) {
    client.close();
    res.status(422).json({ message: "No data found!", status: "failed" });
    return;
  }
};

export default handler;
