import React, { useState } from "react";
import styles from "./ToDoListItem.module.css";

const ToDoListItem = (props) => {
  const { task } = props;
  const [isDone, setIsDone] = useState(task.status);

  const checkboxHandler = () => {
    setIsDone((prev) => !prev);
  };

  const textStyle = {
    textDecoration: isDone ? "line-through" : "none",
  };

  return (
    <li className={styles.listItem} onClick={checkboxHandler}>
      <input
        type="checkbox"
        onChange={checkboxHandler}
        onClick={checkboxHandler}
        checked={isDone ? true : false}
      ></input>
      <span style={textStyle}>{task.task}</span>
    </li>
  );
};

export default ToDoListItem;
