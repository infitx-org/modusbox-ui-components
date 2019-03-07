
const isFalse = item => item === false;
const isTrue = item => item === true;
const isNull = item => item === null;
const isUndefined = item => item === undefined;
const isObject = item => typeof item === 'object';
const isPrimitiveObject = item => isObject(item) && !Array.isArray(item);

const validate = (value, validatorFields) => {
  // if value and validator are available
  // test all validator functions against the value
  const warnings = [];
  let isValid = true;

  // Validators are not available
  if (!isUndefined(validatorFields)) {

    const shouldSkipWarnings = validatorFields.some(validator => validator.skipWarnings);
    const validationResults = validatorFields.map(validator => validator.fn(value));

    validationResults.forEach((result, index) => {
      if (result === false) {
        isValid = false;
        warnings.push(validatorFields[index].message);
      }
    })

    if (isUndefined(value) && isTrue(shouldSkipWarnings)) {
      warnings.length = 0;
    }
  }
  return { warnings, isValid };
};

// test every properties for its own validation
const toValidationResult = (fieldValues = {}, fieldValidators = {}) => {

  const fields = Object.keys(fieldValidators);
  const warnings = [];
  const fieldResults = {};
  let isValid = true;

  fields.forEach(field => {

    if (!isNull(fieldValues)) {

      const fieldValue = fieldValues[field];
      const fieldValidator = fieldValidators[field];
      let fieldResult = { isValid: true, warnings: [] };

      if (isObject(fieldValue) || isPrimitiveObject(fieldValidator)) {
        // the value is an object, needs to be recursively tested
        fieldResult = toValidationResult(fieldValue, fieldValidator);

      } else if (!isUndefined(fieldValidator)) {
        // no validators for the field, validation is successful
        fieldResult = validate(fieldValue, fieldValidator);

      }

      if (!fieldResult.isValid) {
        isValid = false;
      }
      warnings.push(...fieldResult.warnings);
      fieldResults[field] = fieldResult;
    }
    

  });

  return { isValid, warnings, fields: fieldResults };
};

export { validate }
export default toValidationResult;