import createValidation, { createOptionalValidation, createValidator } from './creators';
import { getFieldIsValid, getFieldMessages, getIsValid, getMessages } from './getters';
import toValidationResult, { validate } from './runner';
import vd from './validators';

const validation = {
  vd,
  createValidator,
  createValidation,
  createOptionalValidation,
  toValidationResult,
  validate,
  getMessages,
  getIsValid,
  getFieldMessages,
  getFieldIsValid,
};

export default validation;
export {
  vd,
  createValidator,
  createValidation,
  createOptionalValidation,
  toValidationResult,
  validate,
  getMessages,
  getIsValid,
  getFieldMessages,
  getFieldIsValid,
};
