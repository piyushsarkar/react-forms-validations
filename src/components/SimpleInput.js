// import { useState } from 'react';
import useInput from '../hooks/useInput';

const SimpleInput = (props) => {
  const validateName = (input) => input.trim() !== '';
  const validateEmail = (input) => input.includes('@');

  const {
    input: name,
    hasInputError: hasNameError,
    isInputValid: isNameValid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetInput: resetName,
  } = useInput(validateName);

  const {
    input: email,
    hasInputError: hasEmailError,
    isInputValid: isEmailValid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: resetEmail,
  } = useInput(validateEmail);

  let isFormValid = false;
  if (isNameValid && isEmailValid) isFormValid = true; // state change will trigger re-evaluate of isFormValid

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // setIsNameTouched(true);
    if (!isNameValid && isEmailValid) {
      return;
    }
    console.log(name);
    resetName();
    resetEmail();
  };

  const nameValidationClass = hasNameError
    ? 'form-control invalid'
    : 'form-control';

  const emailValidationClass = hasEmailError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameValidationClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {hasNameError && <p className="error-text">Name is required</p>}
      </div>
      <div className={emailValidationClass}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {hasEmailError && <p className="error-text">Email is required</p>}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
