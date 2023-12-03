import React from "react";
import SearchBar from "@/components/home/SearchBar";
import ToDoList from "@/components/home/ToDoList";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const HomePage = () => {
  return (
    <>
      <SearchBar />
      <hr className="w-3/4 h-[2px] bg-[#00000055]" />
      <ToDoList />
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

  return {
    props: { username: session.user.name },
  };
};

export default HomePage;
