import React from "react";
import classes from "./Order.css";

const order = (props) => (
  <div className={classes.Order}>
    <p>Ingredients: Salad (2)</p>
    <p>
      Price: <strong>5.53 €</strong>
    </p>
  </div>
);

export default order;
