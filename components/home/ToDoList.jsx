import React, { useEffect, useState } from "react";
import ToDoListItem from "./ToDoListItem";
import styles from "./ToDoList.module.css";

const ToDoList = (props) => {
  const [tasks, setTasks] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch(`/api/task/fetchTask`);

    const data = await response.json();

    if (data.status === "failed") {
      setTasks(data);
      setIsError(true);
      setIsLoading(false);
      return;
    }

    setTasks(data.result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isError) {
    return (
      <div className={styles.toDoListContainer}>
        <h1 className={styles.errorText}>{tasks.message}</h1>
      </div>
    );
  }

  return (
    <div className={styles.toDoListContainer}>
      {isLoading && <h1 className={styles.loadingText}>Loading...</h1>}
      {!isLoading && !isError && (
        <ul>
          {tasks.map((task, index) => (
            <ToDoListItem task={task} key={index} username={props.username} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoList;
