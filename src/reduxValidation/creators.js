// create an object with properties message and function to test against
const createValidator = (message, fn, skipWarnings = false) => {
  const base = {
    message,
    fn,
    skipWarnings,
    required: true,
    isOptional: false,
  };
  const optional = {
    ...base,
    required: false,
    isOptional: true,
    fn: value => (value !== undefined ? fn(value) : true),
  };

  return { ...base, optional };
};

// create a function that will test against all validators
// and returns an array of messages or a boolean TRUE
const createValidation = validators => validators.map(validator => {
  const { fn, message, required, skipWarnings } = validator;

  return {
    internal: value => (fn(value) ? true : message),
    skipWarnings,
    ui: {
      fn,
      message,
      required,
    },
  };
});


export { createValidation, createValidator }