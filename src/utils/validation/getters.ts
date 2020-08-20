// @ts-ignore
import get from 'lodash/get';
import { ValidationMessage, ValidationResults } from './types';

const getMessages = (result: ValidationResults): ValidationMessage[] => result.messages;

const getIsValid = (result: ValidationResults): boolean => result.isValid;

const getFieldPath = (field: string): string => `${field.split('.').join('.fields.')}`;

const getFieldMessages = (field: string) => (result: ValidationResults): ValidationMessage[] => {
  const path = getFieldPath(field);
  return get(result, `fields.${path}.messages`);
};

const getFieldIsValid = (field: string) => (result: ValidationResults): boolean => {
  const path = getFieldPath(field);
  return get(result, `fields.${path}.isValid`);
};

export { getMessages, getIsValid, getFieldMessages, getFieldIsValid };
