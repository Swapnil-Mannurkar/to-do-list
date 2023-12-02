import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  return await MongoClient.connect(
    "mongodb+srv://swapnil:todolist@to-do-list.vx4lldn.mongodb.net/?retryWrites=true&w=majority"
  );
};

export const credentials = async (client) => {
  return await client.db("users").collection("credentials");
};
