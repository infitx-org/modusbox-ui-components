import createValidation, { createValidator } from '../creators';
import toValidationResult, { validate } from '../runner';

const oddMessage = 'is odd number';
const oddFn = value => value % 2 === 0;

const evenMessage = 'is odd number';
const evenFn = value => value % 2 === 1;

const gt10Message = 'is greater than 10';
const gt10fn = value => value > 10;

const oddValidator = createValidator(oddMessage, oddFn);
const evenValidator = createValidator(evenMessage, evenFn, true);
const gt10Validator = createValidator(gt10Message, gt10fn);

const testValidation = createValidation([oddValidator, gt10Validator]);

describe('tests validating a value', () => {

  it('should return hasWarnings and isValid object keys', () => {
    const result = validate(10, testValidation);
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('hasWarnings');
    expect(result).toHaveProperty('isValid');
  });

  it('should result in a successfull validation', () => {
    const result = validate(20, testValidation);
    expect(result.hasWarnings).toBe(false);
    expect(result.isValid).toBe(true);
  });

  it('should result in a failed validation', () => {
    const result = validate(11, testValidation);
    expect(result.hasWarnings).toBe(true);
    expect(result.isValid).toBe(false);
  });

  it('should skip the warnings when the the value is not defined and skipWarning is set', () => {
    const evenValidatorSkipWarnings = createValidator(evenMessage, evenFn, true);
    const evenValidation = createValidation([evenValidatorSkipWarnings])
    const result = validate(undefined, evenValidation);
    expect(result.hasWarnings).toBe(false);
    expect(result.isValid).toBe(false);
  });

});

describe('tests validating a value set', () => {

  it('should return warnings and isValid object keys', () => {
    const result = toValidationResult();
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('warnings');
    expect(result).toHaveProperty('isValid');
  });


  it('should validate the whole object', () => {
    const validators = {
      odd: createValidation([oddValidator]),
      even: createValidation([evenValidator]),
      gt10: createValidation([gt10Validator]),
    };
    const values = {
      odd: 4,
      even: 7,
      gt10: 25,
    };

    const result = toValidationResult(values, validators);
    expect(result).toBeInstanceOf(Object);
    expect(result.isValid).toBe(true);
    expect(result.warnings).toBe(0);

  });

});