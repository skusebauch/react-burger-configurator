import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(
    (ingrKey) => {
      return [...Array(props.ingredients[ingrKey])].map((_, index) => {
        return <BurgerIngredient key={ingrKey + index} type={ingrKey} />;
      });
    }
  );
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
