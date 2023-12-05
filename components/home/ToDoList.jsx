import React from "react";
import ToDoListItem from "./ToDoListItem";
import styles from "./ToDoList.module.css";

const ToDoList = (props) => {
  const allTasks = props.allTasks;
  const isError = false;

  if (isError) {
    return (
      <div className={styles.toDoListContainer}>
        <h1 className={styles.errorText}>{tasks.message}</h1>
      </div>
    );
  }

  return (
    <div className={styles.toDoListContainer}>
      <ul>
        {allTasks.map((task, index) => (
          <ToDoListItem task={task} key={index} username={props.username} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
