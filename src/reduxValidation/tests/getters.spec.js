import createValidation, { createValidator } from '../creators';
import { getWarnings, getIsValid, getFieldWarnings, getFieldIsValid, } from '../getters';
import toValidationResult from '../runner';

const oddMessage = 'is odd number';
const oddFn = value => value % 2 === 0;

const evenMessage = 'is odd number';
const evenFn = value => value % 2 === 1;

const gt10Message = 'is greater than 10';
const gt10fn = value => value > 10;

const oddValidator = createValidator(oddMessage, oddFn);
const evenValidator = createValidator(evenMessage, evenFn);
const gt10Validator = createValidator(gt10Message, gt10fn);

const validators = {
  odd: createValidation([oddValidator]),
  foo: {
    even: createValidation([evenValidator]),
    bar: {
      gt10: createValidation([gt10Validator]),
    }
  }
};
const values = {
  odd: 4,
  foo: {
    even: 8,
    bar: {
      gt10: 25,
    }
  }
};

const result = toValidationResult(values, validators);

describe('tests validation result getters', () => {

  it('should get the warnings', () => {
    const warnings = getWarnings(result);
    expect(warnings).toBe(result.warnings);
  });

  it('should get the valid boolean', () => {
    const isValid = getIsValid(result);
    expect(isValid).toBe(result.isValid);
  });

  it('should get the field warnings', () => {
    const getOddFieldWarnings = getFieldWarnings('odd');
    const warnings = getOddFieldWarnings(result);
    expect(warnings).toBe(result.fields.odd.warnings);
  });

  it('should get the nested field warnings', () => {
    const getGt10FieldWarnings = getFieldWarnings('foo.bar.gt10');
    const warnings = getGt10FieldWarnings(result);
    expect(warnings).toBe(result.fields.foo.fields.bar.fields.gt10.warnings);
  });

  it('should get the field is valid', () => {
    const getOddFieldIsValid = getFieldIsValid('odd');
    const isValid = getOddFieldIsValid(result);
    expect(isValid).toBe(result.fields.odd.isValid);
  });

  it('should get the nested field is valid', () => {
    const getGt10FieldIsValid = getFieldIsValid('foo.bar.gt10');
    const isValid = getGt10FieldIsValid(result);
    expect(isValid).toBe(result.fields.foo.fields.bar.fields.gt10.isValid);
  });

});