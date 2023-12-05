import React, { useEffect, useState } from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const NavigationBar = () => {
  const router = useRouter();
  const [username, setusername] = useState();
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

  useEffect(() => {
    if (session) {
      const extractedName = session.user.name;
      setusername(extractedName.toLowerCase());
    }
  }, [session]);

  return (
    <nav className={styles.navigationBar}>
      <Link href="/">
        <h1 className={styles.logo}>TO-DO-LIST</h1>
      </Link>
      <div className={styles.navList}>
        {session && <div>Hello {username}!</div>}
        {session && <Link href={"/profile"}>Profile</Link>}
        <button onClick={loginLogoutClickHandler}>
          {session ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
