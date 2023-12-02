import React from "react";
import SearchBar from "@/components/home/SearchBar";
import ToDoList from "@/components/home/ToDoList";

const HomePage = () => {
  return (
    <>
      <SearchBar />
      <hr
        style={{
          width: "75%",
          height: "2px",
          background: "#00000055",
        }}
      />
      <ToDoList />
    </>
  );
};

export default HomePage;
