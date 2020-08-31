import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  // transfrom state object into array
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingrKey) => {
      return [...Array(props.ingredients[ingrKey])].map((_, index) => {
        return <BurgerIngredient key={ingrKey + index} type={ingrKey} />;
      });
    })
    .reduce((prevArray, currentArray) => {
      return prevArray.concat(currentArray);
    }, []);
  // check if no ingredients, display h1
  if (transformedIngredients.length === 0) {
    transformedIngredients = <h1>Please start adding ingredients</h1>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
