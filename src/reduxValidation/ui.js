const toUIValidation = validators => {
  const validation = {};
  const fields = Object.keys(validators);
  
  fields.forEach(field => {

    const fieldValidators = validators[field];
    let fieldValidation;

    if (Array.isArray(fieldValidators)) {
      fieldValidation = fieldValidators.map(({ ui }) => ui);
    } else {
      fieldValidation = toUIValidation(fieldValidators);
    }

    validation[field] = fieldValidation;
  });
  return validation;
};

export default toUIValidation;