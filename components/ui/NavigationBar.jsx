import React from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const NavigationBar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const loginLogoutClickHandler = (event) => {
    event.preventDefault();

    if (session) {
      signOut({ redirect: false });
      router.push("/auth");
    } else {
      router.replace("/auth");
    }
  };

  return (
    <nav className={styles.navigationBar}>
      <Link href="/">
        <h1 className={styles.logo}>TO-DO-LIST</h1>
      </Link>
      <ul className={styles.navList}>
        {/* {session && <Link href={"/profile"}>Profile</Link>} */}
        <button onClick={loginLogoutClickHandler}>
          {session ? "Logout" : "Login"}
        </button>
      </ul>
    </nav>
  );
};

export default NavigationBar;
