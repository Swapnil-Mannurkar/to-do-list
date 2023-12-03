import React, { useRef } from "react";
import styles from "./AddTask.module.css";
import { FaCirclePlus } from "react-icons/fa6";

const AddTask = ({ username }) => {
  const taskRef = useRef();

  const addTaskHandler = async (event) => {
    event.preventDefault();

    const task = taskRef.current.value;
    console.log(task);

    const response = await fetch("/api/task/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, username }),
    });

    taskRef.current.value = "";
  };

  return (
    <div className={styles.searchBarContainer}>
      <h1>Add your upcoming task!</h1>
      <form>
        <input type="text" ref={taskRef} required />
        <button onClick={addTaskHandler}>
          <FaCirclePlus />
          Add task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
