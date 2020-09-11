import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-order";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1.5,
  bacon: 1.0,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 3.5,
    purchasable: false,
    orderNow: false,
    loading: false,
    error: false,
  };
  // retrieving ingredients
  componentDidMount() {
    console.log(this.props);
    //axios
    //  .get("https://burger-configurator.firebaseio.com/ingredients.json")
    //  .then((response) => {
    //    this.setState({ ingredients: response.data });
    //  })
    //  .catch((error) => {
    //    this.setState({ error: true });
    //  });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((ingrKey) => {
        return ingredients[ingrKey];
      })
      .reduce((sum, element) => {
        return sum + element;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = newCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = newCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  orderNowHandler = () => {
    this.setState({ orderNow: true });
  };

  removeOrderNowHandler = () => {
    this.setState({ orderNow: false });
  };

  continueOrderNowHandler = () => {
    ////alert("You continue!!");

    //prepare selected ingredients for url
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
        //return ["bacon=1", "cheese=1", "meat=0", "salad=1"]
      );
    }
    queryParams.push("price=" + this.state.totalPrice);

    const queryString = queryParams.join("&"); //return bacon=1&cheese=1&meat=1&salad=1
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients cat't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientsHandler}
            ingredientRemoved={this.removeIngredientsHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.orderNowHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.removeOrderNowHandler}
          purchaseContinued={this.continueOrderNowHandler}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.orderNow}
          modalClosed={this.removeOrderNowHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
