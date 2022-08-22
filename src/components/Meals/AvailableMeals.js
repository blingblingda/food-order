import React, { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMealsHandler();
  }, []);

  const fetchMealsHandler = async () => {
    // const wait = (delay) =>
    //   new Promise((resolve) => setTimeout(resolve, delay));
    // await wait(2000);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-http-195b9-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          price: data[key].price,
          description: data[key].description,
        });
      }
      setMeals(loadedMeals);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  let content = <p>Found no meals.</p>;
  if (meals.length > 0) {
    content = (
      <ul>
        {meals.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}
      </ul>
    );
  }
  if (error) {
    content = (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }
  if (isLoading) {
    content = (
      <section className={classes.MealsLoading}>
        <p>Loading</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
