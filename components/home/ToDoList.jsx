import React from "react";
import ToDoListItem from "./ToDoListItem";
import styles from "./ToDoList.module.css";

const DUMMY_DATA = ["task1", "task2", "task3", "task4"];

const ToDoList = () => {
  return (
    <div className={styles.toDoListContainer}>
      <ul>
        {DUMMY_DATA.map((task) => (
          <ToDoListItem task={task} key={task} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
