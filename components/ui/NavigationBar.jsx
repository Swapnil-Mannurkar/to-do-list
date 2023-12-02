import React from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store/authSlice";
import { useRouter } from "next/router";

const NavigationBar = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const router = useRouter();

  const loginLogoutClickHandler = (event) => {
    event.preventDefault();

    if (isLogin) {
      dispatch(authActions.toggleLogin());
      router.replace("/auth");
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
        {isLogin && <Link href={"/profile"}>Profile</Link>}
        <button onClick={loginLogoutClickHandler}>
          {isLogin ? "Logout" : "Login"}
        </button>
      </ul>
    </nav>
  );
};

export default NavigationBar;
