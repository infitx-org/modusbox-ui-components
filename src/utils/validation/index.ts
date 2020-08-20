import createValidation, { createOptionalValidation, createValidator } from './creators';
import { getFieldIsValid, getFieldMessages, getIsValid, getMessages } from './getters';
import toValidationResult, { validate } from './runner';
import vd from './validators';
import {
  ValidationMessage,
  ValidationField,
  ValidationFields,
  ValidationResults,
} from './types';

export type {
  ValidationMessage,
  ValidationField,
  ValidationFields,
  ValidationResults,
};

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

export default {
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
