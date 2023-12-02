import Credentials from "next-auth/providers/credentials";
import { connectDatabase, credentialsCollection } from "../../../lib/db";
import NextAuth from "next-auth/next";
import { verifyPassword } from "@/lib/auth";

export const authOptions = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = await connectDatabase();

        const collection = await credentialsCollection(client);

        const user = await collection.findOne({ _id: credentials.username });

        if (!user) {
          client.close();
          throw new Error("User not found!");
        }

        const passwordIsValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!passwordIsValid) {
          client.close();
          throw new Error("Invalid password!");
        }

        client.close();
        return { username: user._id };
      },
    }),
  ],
};

export default NextAuth(authOptions);
