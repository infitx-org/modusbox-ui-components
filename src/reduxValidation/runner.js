
const isNull = item => item === null;
const isUndefined = item => item === undefined;
const isObject = item => typeof item === 'object';
const isPrimitiveObject = item => isObject(item) && !Array.isArray(item);

const validate = (value, validatorFields) => {
  // if value and validator are available
  // test all validator functions against the value
  const messages = validatorFields.map(({ message }) => ({ active: false, message }));
  let isValid = true;

  // Validators are not available
  if (!isUndefined(validatorFields)) {

    validatorFields.forEach((validator, index) => {
      const { fn, required } = validator;
      const result = fn(value);
      if (result === true) {
        messages[index].active = false;
      } else if(isUndefined(value) && !required){
        isValid = true;
        messages[index].active = undefined;
      } else {
        isValid = false;
        messages[index].active = true;
      }
    });
  }
  return { messages, isValid };
};

// test every properties for its own validation
const toValidationResult = (fieldValues = {}, fieldValidators = {}) => {

  const fields = Object.keys(fieldValidators);
  const messages = [];
  const fieldResults = {};
  let isValid = true;

  fields.forEach(field => {

    if (!isNull(fieldValues)) {

      const fieldValue = fieldValues[field];
      const fieldValidator = fieldValidators[field];
      let fieldResult = { isValid: true, messages: [] };


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
      messages.push(...fieldResult.messages);
      fieldResults[field] = fieldResult;
    }
    

  });

  return { isValid, messages, fields: fieldResults };
};

export { validate }
export default toValidationResult;