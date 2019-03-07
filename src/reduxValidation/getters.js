import get from 'lodash/get';

const getWarnings = result => result.warnings;
const getIsValid = result => result.isValid;

const getFieldPath = field => `${field.split('.').join('.fields.')}`;
const getFieldWarnings = field => result => {
  const path = getFieldPath(field);
  return get(result, `fields.${path}.warnings`);
}
const getFieldIsValid = field => result => {
  const path = getFieldPath(field);
  return get(result, `fields.${path}.isValid`);
}


export {
  getWarnings,
  getIsValid,
  getFieldWarnings,
  getFieldIsValid,
}