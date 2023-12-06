import React, { useRef, useState } from "react";
import styles from "./AuthForm.module.css";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Modal from "../ui/Modal";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  const onChangeHandler = () => {
    setDisplayError(false);
  };

  const togglePasswordHandler = () => {
    setDisplayPassword((prev) => !prev);
  };

  const toggleLoginSignupHandler = () => {
    setIsLogin((prev) => !prev);
    usernameRef.current.value = "";
    passwordRef.current.value = "";
    setDisplayError(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (isLogin) {
      const response = await signIn("credentials", {
        redirect: false,
        username: enteredUsername.trim(),
        password: enteredPassword.trim(),
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
          username: enteredUsername.trim(),
          password: enteredPassword.trim(),
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

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <Modal message={`${isLogin ? "Logging" : "Signing"} you in...`} />
      )}
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
            type={displayPassword ? "text" : "password"}
            required
            ref={passwordRef}
            onChange={onChangeHandler}
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          />
          {displayPassword ? (
            <RiEyeFill
              className={styles.eyeIcon}
              onClick={togglePasswordHandler}
            />
          ) : (
            <RiEyeCloseFill
              className={styles.eyeIcon}
              onClick={togglePasswordHandler}
            />
          )}
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
              <br /> <span className={styles.textBlue}>Click here</span> to
              create an account!
            </span>
          ) : (
            <span>
              Already have an account? <br />
              <span className={styles.textBlue}>Click here</span> to login!
            </span>
          )}
        </p>
      </form>
    </>
  );
};

export default AuthForm;
