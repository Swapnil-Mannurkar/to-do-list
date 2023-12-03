import React from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <>
      <div className={styles.modalBg} />
      <div className={styles.modalContent}>
        <h1>{props.message}</h1>
      </div>
    </>
  );
};

export default Modal;
