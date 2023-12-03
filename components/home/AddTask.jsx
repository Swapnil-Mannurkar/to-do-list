import React from "react";
import styles from "./AddTask.module.css";
import { FaCirclePlus } from "react-icons/fa6";

const SearchBar = () => {
  return (
    <div className={styles.searchBarContainer}>
      <h1>Add your upcoming task!</h1>
      <form>
        <input type="text" required />
        <button>
          <FaCirclePlus />
          Add task
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
