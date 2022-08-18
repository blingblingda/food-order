import React from "react";
import classes from "./Cart.module.css";

import Modal from "../UI/Modal";

const Cart = (props) => {
  const dummyMeals = [
    {
      id: "m1",
      name: "Sushi",
      description: "Finest fish and veggies",
      price: 22.99,
    },
  ];

  return (
    <Modal onHideCart={props.onHideCart}>
      <ul className={classes["cart-items"]}>
        {dummyMeals.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>22.99</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
