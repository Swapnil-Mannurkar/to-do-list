import React, { useState } from "react";
import styles from "./ToDoListItem.module.css";
import Modal from "../ui/Modal";

const ToDoListItem = (props) => {
  const { task, username } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(task.status === "true");

  const checkboxHandler = async (event) => {
    setIsLoading(true);
    const task = event.target.innerText;
    const status = !isDone;

    const response = await fetch("/api/task/updateTask", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, status, username }),
    });

    if (!response.ok) {
      console.log("failed");
      return;
    }

    setIsDone(status);
    setIsLoading(false);
  };

  const textStyle = {
    textDecoration: isDone ? "line-through" : "none",
  };

  return (
    <>
      {isLoading && <Modal message={"Updating the task..."} />}
      <li className={styles.listItem} onClick={checkboxHandler}>
        <input
          type="checkbox"
          onChange={checkboxHandler}
          onClick={checkboxHandler}
          checked={isDone ? true : false}
        ></input>
        <span style={textStyle}>{task.task}</span>
      </li>
    </>
  );
};

export default ToDoListItem;
