import React, { useRef, useState } from "react";
import styles from "./AuthForm.module.css";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  const onChangeHandler = () => {
    setDisplayError(false);
  };

  const toggleLoginSignupHandler = () => {
    setIsLogin((prev) => !prev);
    usernameRef.current.value = "";
    passwordRef.current.value = "";
    setDisplayError(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (isLogin) {
      const response = await signIn("credentials", {
        redirect: false,
        username: enteredUsername,
        password: enteredPassword,
      });

      if (!response.error) {
        router.replace("/");
      } else {
        setDisplayError(true);
        setErrorMessage(response.error);
      }
    } else {
      const response = await fetch("/api/auth/signup", {
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
        setIsLogin(true);
      }
    }
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
          onChange={onChangeHandler}
          title="Please enter a username"
        />
      </div>
      <div className={styles.inputField}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          ref={passwordRef}
          onChange={onChangeHandler}
          title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
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
