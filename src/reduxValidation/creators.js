// create an object with properties message and function to test against
const createValidator = (message, fn, skipWarnings = false) => {
  const base = {
    message,
    fn,
    skipWarnings,
    required: true,
  };
  const optional = {
    ...base,
    required: false,
    fn: value => (value !== undefined ? fn(value) : true),
  };

  return { ...base, optional };
};

// create a function that will test against all validators
// and returns an array of messages or a boolean TRUE
const createValidation = validators => validators.map(validator => {
  const { fn, message, required, skipWarnings, isOptional } = validator;
  return {
    message,
    fn,
    skipWarnings,
    required,
    isOptional,
  };
});

export default createValidation; 
export { createValidator }