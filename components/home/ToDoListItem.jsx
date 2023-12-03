import React, { useState } from "react";
import styles from "./ToDoListItem.module.css";
import Modal from "../ui/Modal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";

const ToDoListItem = (props) => {
  const { task, username } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(task.status);
  const router = useRouter();

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

  const deleteHandler = async (task) => {
    setIsLoading(true);
    const response = await fetch("/api/task/deleteTask", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, username }),
    });

    if (!response.ok) {
      console.log("failed");
      return;
    }

    setIsLoading(false);
    router.reload();
  };

  const textStyle = {
    textDecoration: isDone ? "line-through" : "none",
  };

  return (
    <>
      {isLoading && <Modal message={"Updating task..."} />}
      <li className={styles.listItem}>
        <div className={styles.taskContainer} onClick={checkboxHandler}>
          <input
            type="checkbox"
            onChange={checkboxHandler}
            onClick={checkboxHandler}
            checked={isDone ? true : false}
          ></input>
          <span style={textStyle}>{task.task}</span>
        </div>
        <div className={styles.deleteIcon}>
          <RiDeleteBin6Line onClick={() => deleteHandler(task.task)} />
        </div>
      </li>
    </>
  );
};

export default ToDoListItem;
