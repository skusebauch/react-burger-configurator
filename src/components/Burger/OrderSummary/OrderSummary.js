import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // Could be functional compoenent - just for debugging
  // componentWillUpdate() {
  //   console.log("[OderSummary] WillUpdate");
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingrKey) => {
        return (
          <li key={ingrKey}>
            <span style={{ textTransform: "capitalize" }}>{ingrKey}</span>:
            {this.props.ingredients[ingrKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)} €</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
