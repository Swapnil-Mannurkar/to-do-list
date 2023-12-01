import React from "react";
import styles from "./homePage.module.css";
import SearchBar from "@/components/home/SearchBar";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <SearchBar />
      <hr
        style={{
          width: "75%",
          height: "2px",
          color: "black",
          background: "black",
        }}
      />
    </div>
  );
};

export default HomePage;
