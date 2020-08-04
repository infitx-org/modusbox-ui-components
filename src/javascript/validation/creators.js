// create an object with properties message and function to test against
const createValidator = (message, fn, appliesToTokens = false) => ({
  message,
  fn,
  appliesToTokens,
});

const buildValidationCreator = isRequired => (validators, variables, selectors) => ({
  isRequired,
  variables,
  selectors,
  validators: validators.map(validator => {
    const { fn, message, appliesToTokens } = validator;
    return {
      message,
      fn,
      appliesToTokens,
    };
  }),
});

// create functions that will test against all validators
const createValidation = buildValidationCreator(true);
const createOptionalValidation = buildValidationCreator(false);

export default createValidation;
export { createOptionalValidation, createValidator };
