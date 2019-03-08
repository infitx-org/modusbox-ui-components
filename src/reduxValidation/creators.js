// create an object with properties message and function to test against
const createValidator = (message, fn) => {
  const validator = {
    message,
    fn,
    required: true,
  };
  const optional = {
    ...validator,
    required: false,
  };

  return { ...validator, optional };
};

// create a function that will test against all validators
// and returns an array of messages or a boolean TRUE
const createValidation = validators => validators.map(validator => {
  const { fn, message, required } = validator;
  return {
    message,
    fn,
    required,
  };
});

export default createValidation; 
export { createValidator }