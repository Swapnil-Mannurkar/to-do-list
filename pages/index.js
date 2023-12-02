import React from "react";
import SearchBar from "@/components/home/SearchBar";
import ToDoList from "@/components/home/ToDoList";

const HomePage = () => {
  return (
    <>
      <SearchBar />
      <hr className="w-3/4 h-[2px] bg-[#00000055]" />
      <ToDoList />
    </>
  );
};

export default HomePage;
