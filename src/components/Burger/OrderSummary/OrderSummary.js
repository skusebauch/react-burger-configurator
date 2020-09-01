import React from "react";
import Aux from "../../../hoc/Aux";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingrKey) => {
    return (
      <li key={ingrKey}>
        <span style={{ textTransform: "capitalize" }}>{ingrKey}</span>:
        {props.ingredients[ingrKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;
