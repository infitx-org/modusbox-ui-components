
const isFalse = item => item === false;
const isTrue = item => item === true;
const isNull = item => item === null;
const isUndefined = item => item === undefined;
const isObject = item => typeof item === 'object';
const isPrimitiveObject = item => isObject(item) && !Array.isArray(item);

const validate = (value, validatorFields) => {
  // if value and validator are available
  // test all validator functions against the value
  let hasWarnings = false;
  let isValid = true;

  // Validators are not available
  if (!isUndefined(validatorFields)) {

    const shouldSkipWarnings = validatorFields.some(validator => validator.skipWarnings);
    const validationResults = validatorFields.map(validator => validator.fn(value));

    isValid = validationResults.every(isTrue);

    if (!isUndefined(value) || isFalse(shouldSkipWarnings)) {

      hasWarnings = !isValid;

    }
  }
  return { hasWarnings, isValid };
};

// test every properties for its own validation
const toValidationResult = (valueFields = {}, validatorFields = {}) => {

  const fields = Object.keys(validatorFields);
  const results = [];
  let warnings = 0;

  fields.forEach(field => {

    let hasWarnings;
    let isValid;
    const valueValidators = validatorFields[field];

    if (isNull(valueFields)) {

      isValid = true;
      hasWarnings = false;

    } else {

      const value = valueFields[field];

      if (isUndefined(valueValidators)) {
        // no validators for the field, validation is successful

        isValid = true;
        hasWarnings = false;

      } else if (isObject(value) || isPrimitiveObject(valueValidators)) {
        // the value is an object, needs to be recursively tested

        const validationResult = toValidationResult(value, valueValidators);

        warnings += validationResult.warnings.length;
        ({ isValid } = validationResult);

      } else {
        // regular value, validate
        ({ hasWarnings, isValid } = validate(value, valueValidators));

        if (hasWarnings) {
          warnings += 1;
        }
      }
    }

    results.push(isValid);

  });

  const isValid = results.every(isTrue);
  return { isValid, warnings };
};

export { validate }
export default toValidationResult;