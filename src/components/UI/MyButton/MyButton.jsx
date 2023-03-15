import React from "react";
import "./MyButton.scss"

const MyButton = ({children, onClick}) => {
  return <button onClick={onClick}>{children}</button>;
};

export default MyButton;
