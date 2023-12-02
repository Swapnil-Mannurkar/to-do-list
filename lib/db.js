import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  return await MongoClient.connect(
    "mongodb+srv://swapnil:mannurkar@to-do-list.vx4lldn.mongodb.net/?retryWrites=true&w=majority"
  );
};

export const credentialsCollection = async (client) => {
  return await client.db("users").collection("credentials");
};
