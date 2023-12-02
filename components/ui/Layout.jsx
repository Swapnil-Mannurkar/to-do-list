import React from "react";
import styles from "./Layout.module.css";
import NavigationBar from "./NavigationBar";

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <NavigationBar />
      {props.children}
    </div>
  );
};

export default Layout;
