import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchBarContainer}>
      <h1>Add your task!</h1>
      <form>
        <input type="text" required />
        <button>Add task</button>
      </form>
    </div>
  );
};

export default SearchBar;
