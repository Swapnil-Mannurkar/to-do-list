import React, { useRef, useState } from "react";
import styles from "./AuthForm.module.css";
import { useRouter } from "next/router";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  const toggleLoginSignupHandler = () => {
    setIsLogin((prev) => !prev);
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (isLogin) {
      // login logic
    } else {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: enteredUsername,
          password: enteredPassword,
        }),
      });

      const data = await response.json();

      if (data.status === "failed") {
        setDisplayError(true);
        setErrorMessage(data.message);
      } else {
        router.replace("/");
      }
    }

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <form className={styles.authForm} onSubmit={submitHandler}>
      <h1>{isLogin ? "LOGIN" : "SIGN UP"}</h1>
      <div className={styles.inputField}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          required
          ref={usernameRef}
          title="Please enter a username"
        />
      </div>
      <div className={styles.inputField}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          ref={passwordRef}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
        />
      </div>
      <button className={styles.actionButton}>
        {isLogin ? "LOGIN" : "SIGN UP"}
      </button>
      {displayError && <p className={styles.errorMessage}>{errorMessage}</p>}
      <p
        onClick={toggleLoginSignupHandler}
        className={styles.loginSignupToggle}
      >
        {isLogin ? (
          <span>
            New user?
            <br /> <span className={styles.textBlue}>Click here</span> to create
            an account!
          </span>
        ) : (
          <span>
            Already have an account? <br />
            <span className={styles.textBlue}>Click here</span> to login!
          </span>
        )}
      </p>
    </form>
  );
};

export default AuthForm;
