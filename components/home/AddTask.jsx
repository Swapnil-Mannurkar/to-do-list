import React, { useRef, useState } from "react";
import styles from "./AddTask.module.css";
import { FaCirclePlus } from "react-icons/fa6";
import Modal from "../ui/Modal";
import { useRouter } from "next/router";

const AddTask = ({ username }) => {
  const taskRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addTaskHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const task = taskRef.current.value;

    const response = await fetch("/api/task/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, username }),
    });

    taskRef.current.value = " ";
    setIsLoading(false);
    router.reload();
  };

  return (
    <div className={styles.searchBarContainer}>
      {isLoading && <Modal />}
      <h1>Add your upcoming task!</h1>
      <form onSubmit={addTaskHandler}>
        <input type="text" ref={taskRef} required />
        <button>
          <FaCirclePlus />
          Add task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
