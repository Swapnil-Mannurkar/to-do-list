import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { connectDatabase, credentialsCollection } from "../../../lib/db";
import { verifyPassword } from "@/lib/auth";

export const authOptions = {
  secret: "thequickbrownfox",
  site: "https://swapnil-mannurkar-to-do-list.netlify.app",
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
        return { name: user._id, image: null, email: null };
      },
    }),
  ],
};

export default NextAuth(authOptions);
