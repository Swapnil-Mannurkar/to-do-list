import React from "react";
import AddTask from "@/components/home/AddTask";
import ToDoList from "@/components/home/ToDoList";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { connectDatabase, taskCollection } from "@/lib/db";
import Head from "next/head";

const HomePage = (props) => {
  const allTasks = props.allTasks;
  const username = props.username;
  const isError = props.isError;

  return (
    <>
      <Head>
        <title>To-Do-List</title>
        <meta name="description" content="list of tasks of the user!" />
      </Head>
      <AddTask username={username} />
      <hr className="homeHr" />
      <ToDoList allTasks={allTasks} username={username} isError={isError} />
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
  }

  try {
    const client = await connectDatabase();
    const collection = await taskCollection(client, session.user.name);
    let allTasks = await collection.find({}).toArray();
    if (allTasks.length === 0) {
      return {
        props: { allTasks: {}, username: session.user.name, isError: true },
      };
    }
    allTasks = allTasks.map(({ _id, ...data }) => data);

    return {
      props: { allTasks, username: session.user.name, isError: false },
    };
  } catch (error) {
    return {
      props: { allTasks: {}, username: session.user.name, isError: true },
    };
  }
};

export default HomePage;
