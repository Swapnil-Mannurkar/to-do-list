import React from "react";
import AddTask from "@/components/home/AddTask";
import ToDoList from "@/components/home/ToDoList";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { connectDatabase, taskCollection } from "@/lib/db";

const HomePage = (props) => {
  const allTasks = props.allTasks;
  const username = props.username;

  return (
    <>
      <AddTask username={username} />
      <hr className="homeHr" />
      <ToDoList allTasks={allTasks} username={username} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  } else {
    const client = await connectDatabase();
    const collection = await taskCollection(client, session.user.name);
    let allTasks = await collection.find({}).toArray();

    allTasks = allTasks.map(({ _id, ...data }) => data);

    return {
      props: { allTasks, username: session.user.name },
    };
  }
};

export default HomePage;
