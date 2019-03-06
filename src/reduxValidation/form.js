const validateForm = (values, fields) => {
  let formValid = true;
  const fieldData = fields.reduce((allFieldData, field) => {
    const value = values[field.name];
    const messages = field.validators.map((validator) => {
      const validation = validator(value);

      if (!validation.valid) {
        formValid = false;
      }

      return validation;
    });

    return {
      ...allFieldData,
      [field.name]: messages,
    };
  }, {});

  return {
    valid: formValid,
    other: '',
    fields: fieldData,
  };
}

export default validateForm;