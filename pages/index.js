import React from "react";
import styles from "./homePage.module.css";
import SearchBar from "@/components/home/SearchBar";
import ToDoList from "@/components/home/ToDoList";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <SearchBar />
      <hr
        style={{
          width: "75%",
          height: "2px",
          background: "#00000055",
        }}
      />
      <ToDoList />
    </div>
  );
};

export default HomePage;
