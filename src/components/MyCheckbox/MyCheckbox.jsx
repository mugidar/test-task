import React from "react";
import styles from  "./MyCheckbox.module.scss";

const MyCheck = ({oneItem,handleCheckboxChange}) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={(event) => handleCheckboxChange(event, oneItem)}  />
      <span className={styles.slider}></span>
    </label>
  );
};

export default MyCheck;
