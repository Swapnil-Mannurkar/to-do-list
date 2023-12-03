import React from "react";
import styles from "./Modal.module.css";

const Modal = () => {
  return (
    <>
      <div className={styles.modalBg} />
      <div className={styles.modalContent}>
        <h1>Adding new task...</h1>
      </div>
    </>
  );
};

export default Modal;
