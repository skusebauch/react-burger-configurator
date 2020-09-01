import React from "react";
import burgerLogo from "../../assets/images/burger.png";
import classes from "./Logo.css";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="Burger-Logo" />
  </div>
);

export default logo;
