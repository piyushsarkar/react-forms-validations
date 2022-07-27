import { useReducer } from 'react';

const initialArgs = {
  value: '',
  isTouched: false,
};

const reducerFunction = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return { value: action.value };
    case 'BLUR':
      return { isTouched: true, value: state.value };
    case 'RESET':
      return { isTouched: false, value: '' };
    default:
      return initialArgs;
  }
};

const useInput = (validityCheck) => {
  const [inputState, inputDispatch] = useReducer(reducerFunction, initialArgs);

  const isInputValid = validityCheck(inputState.value);
  const hasInputError = !isInputValid && inputState.isTouched; // used only for styling

  const inputChangeHandler = (event) => {
    inputDispatch({ type: 'INPUT', value: event.target.value });
  };
  const inputBlurHandler = () => inputDispatch({ type: 'BLUR' });
  const resetInput = () => inputDispatch({ type: 'RESET' });

  return {
    input: inputState.value,
    isInputValid,
    hasInputError,
    inputChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};

export default useInput;

/*
import { useState } from 'react';

const useInput = (validityCheck) => {
  const [input, setInput] = useState('');
  const [isInputTouched, setIsInputTouched] = useState(false);

  const isInputValid = validityCheck(input);
  const hasInputError = !isInputValid && isInputTouched;

  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsInputTouched(true);
  };

  const resetInput = () => {
    setInput('');
    setIsInputTouched(false);
  };

  return {
    input,
    isInputValid,
    hasInputError,
    inputChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};

export default useInput;
*/
