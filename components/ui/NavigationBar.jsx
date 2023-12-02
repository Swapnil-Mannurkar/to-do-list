import React from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <nav className={styles.navigationBar}>
      <Link href="/">
        <h1 className={styles.logo}>TO-DO-LIST</h1>
      </Link>
      <ul className={styles.navList}>
        <Link href={"/profile"}>Profile</Link>
        <Link href={"/auth"}>
          <button>Login</button>
        </Link>
      </ul>
    </nav>
  );
};

export default NavigationBar;
