import React, { Fragment } from "react";
import classes from "./Header.module.css";

import mealsImg from "../../assets/meals.jpeg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img
          src={mealsImg}
          alt="A table full of delicious food!"
          className={classes.img}
        />
      </div>
    </Fragment>
  );
};

export default Header;
