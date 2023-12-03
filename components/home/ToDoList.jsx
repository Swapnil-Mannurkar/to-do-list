import React, { useEffect, useState } from "react";
import ToDoListItem from "./ToDoListItem";
import styles from "./ToDoList.module.css";

const DUMMY_DATA = ["task1", "task2", "task3", "task4"];

const ToDoList = (props) => {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`/api/task/fetchTask`);

    const data = await response.json();

    setTasks(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.toDoListContainer}>
      <ul>
        {tasks.map((task, index) => (
          <ToDoListItem task={task} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
