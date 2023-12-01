import AddTask from "@/components/home/AddTask";
import React from "react";
import styles from "./homePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <AddTask />
    </div>
  );
};

export default HomePage;
