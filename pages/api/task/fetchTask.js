import { connectDatabase, taskCollection } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const username = session.user.name;

  const client = await connectDatabase();

  const collection = await taskCollection(client, username);

  const result = await collection.find({}).toArray();

  res.status(200).json(result);

  client.close();
};

export default handler;
