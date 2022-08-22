import classes from "./Checkout.module.css";
import useInput from "../../hooks/use_Input";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredPostcode,
    isValid: postcodeIsValid,
    hasError: postcodeHasError,
    valueChangeHandler: postcodeChangeHandler,
    valueBlurHandler: postcodeBlurHandler,
    reset: resetPostcode,
  } = useInput((value) => value.trim().length === 4);
  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (nameIsValid && streetIsValid && postcodeIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetName();
    resetStreet();
    resetPostcode();
    resetCity();
  };

  const nameControlClasses = `${classes.control} ${
    nameHasError ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;
  const postcodeControlClasses = `${classes.control} ${
    postcodeHasError ? classes.invalid : ""
  }`;
  const cityControlClasses = `${classes.control} ${
    cityHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        ></input>
        {nameHasError && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        ></input>
        {streetHasError && <p>Please enter a valid street.</p>}
      </div>
      <div className={postcodeControlClasses}>
        <label htmlFor="postcode">Post Code</label>
        <input
          type="text"
          id="postcode"
          value={enteredPostcode}
          onChange={postcodeChangeHandler}
          onBlur={postcodeBlurHandler}
        ></input>
        {postcodeHasError && (
          <p>Please enter a valid postcode. (4 characters long.)</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        ></input>
        {cityHasError && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
