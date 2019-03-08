import get from 'lodash/get';

const getMessages = result => result.messages;
const getIsValid = result => result.isValid;

const getFieldPath = field => `${field.split('.').join('.fields.')}`;
const getFieldWarnings = field => result => {
  const path = getFieldPath(field);
  return get(result, `fields.${path}.messages`);
}
const getFieldIsValid = field => result => {
  const path = getFieldPath(field);
  return get(result, `fields.${path}.isValid`);
}


export {
  getMessages,
  getIsValid,
  getFieldWarnings,
  getFieldIsValid,
}