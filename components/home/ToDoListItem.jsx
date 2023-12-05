import React, { useEffect, useState } from "react";
import styles from "./ToDoListItem.module.css";
import Modal from "../ui/Modal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";

const ToDoListItem = ({ task, username }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDone, setIsDone] = useState(task.status);
  const router = useRouter();

  const changeHandler = async (task, operation) => {
    setIsLoading(true);
    let response;

    if (operation === "Update") {
      const status = !isDone;

      response = await fetch("/api/task/updateTask", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, status, username }),
      });

      if (response.ok) {
        setIsDone(status);
      }
      setIsLoading(false);
      return;
    }

    if (operation === "Delete") {
      response = await fetch("/api/task/updateTask", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, username }),
      });
    }

    if (!response.ok) {
      const data = await response.json();
      setErrorMessage(data.message);
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 1500);
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
      {isError && <Modal message={errorMessage} />}
      {isLoading && <Modal message={"Updating task..."} />}
      <li className={styles.listItem}>
        <div
          className={styles.taskContainer}
          onClick={() => changeHandler(task.task, "Update")}
        >
          <input
            type="checkbox"
            onChange={changeHandler}
            onClick={changeHandler}
            checked={isDone ? true : false}
          ></input>
          <span style={textStyle}>{task.task}</span>
        </div>
        <div className={styles.deleteIcon}>
          <RiDeleteBin6Line
            onClick={() => changeHandler(task.task, "Delete")}
          />
        </div>
      </li>
    </>
  );
};

export default ToDoListItem;
