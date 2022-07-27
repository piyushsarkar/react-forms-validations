import useInput from '../hooks/useInput';

const BasicForm = (props) => {
  const validateText = (input) => input.trim() !== '';
  const validateEmail = (input) => input.includes('@');

  const {
    input: firstName,
    hasInputError: hasFirstNameError,
    isInputValid: isFirstNameValid,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    resetInput: resetFirstName,
  } = useInput(validateText);

  const {
    input: lastName,
    hasInputError: hasLastNameError,
    isInputValid: isLastNameValid,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    resetInput: resetLastName,
  } = useInput(validateText);

  const {
    input: email,
    hasInputError: hasEmailError,
    isInputValid: isEmailValid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: resetEmail,
  } = useInput(validateEmail);

  let isFormValid = false;
  if (isFirstNameValid && isLastNameValid && isEmailValid) isFormValid = true;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }
    console.log(firstName, lastName, email);
    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const firstNameValidationClass = hasFirstNameError
    ? 'form-control invalid'
    : 'form-control';
  const lastNameValidationClass = hasLastNameError
    ? 'form-control invalid'
    : 'form-control';
  const emailValidationClass = hasEmailError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameValidationClass}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {hasFirstNameError && (
            <p className="error-text">First Name is required</p>
          )}
        </div>
        <div className={lastNameValidationClass}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {hasLastNameError && (
            <p className="error-text">Last Name is required</p>
          )}
        </div>
      </div>
      <div className={emailValidationClass}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
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

export default BasicForm;
