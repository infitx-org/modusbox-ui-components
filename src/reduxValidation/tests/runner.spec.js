import createValidation, { createValidator } from '../creators';
import toValidationResult, { validate } from '../runner';

const oddMessage = 'is odd number';
const oddFn = value => value % 2 === 0;

const evenMessage = 'is odd number';
const evenFn = value => value % 2 === 1;

const gt10Message = 'is greater than 10';
const gt10fn = value => value > 10;

const oddValidator = createValidator(oddMessage, oddFn);
const evenValidator = createValidator(evenMessage, evenFn);
const gt10Validator = createValidator(gt10Message, gt10fn);

const evenValidatorSkipWarnings = createValidator(evenMessage, evenFn, true);

const testValidation = createValidation([oddValidator, gt10Validator]);

describe('tests validating a value', () => {

  it('should return hasWarnings and isValid object keys', () => {
    const result = validate(10, testValidation);
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('warnings');
    expect(result).toHaveProperty('isValid');
  });

  it('should result in a successfull validation', () => {
    const result = validate(20, testValidation);
    expect(result.warnings).toHaveLength(0);
    expect(result.isValid).toBe(true);
  });

  it('should result in a failed validation', () => {
    const result = validate(11, testValidation);
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0]).toBe(oddMessage);
    expect(result.isValid).toBe(false);
  });

  it('should skip the warnings when the the value is not defined and skipWarning is set', () => {
    const evenValidation = createValidation([evenValidatorSkipWarnings])
    const result = validate(undefined, evenValidation);
    expect(result.warnings).toHaveLength(0);
    expect(result.isValid).toBe(false);
  });

});

describe('tests validating a value set', () => {

  it('should return warnings and isValid object keys', () => {
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
    const result = toValidationResult(validators, values);
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('warnings');
    expect(result).toHaveProperty('isValid');
    expect(result).toHaveProperty('fields');
    expect(result.fields).toHaveProperty('odd');
    expect(result.fields).toHaveProperty('even');
    expect(result.fields).toHaveProperty('gt10');
    expect(result.fields.odd).toHaveProperty('isValid');
    expect(result.fields.odd).toHaveProperty('warnings');
    expect(result.fields.even).toHaveProperty('isValid');
    expect(result.fields.even).toHaveProperty('warnings');
    expect(result.fields.gt10).toHaveProperty('isValid');
    expect(result.fields.gt10).toHaveProperty('warnings');
  });

  it('should validate the whole object', () => {
    const validators = {
      odd: createValidation([oddValidator]),
      even: createValidation([evenValidator]),
      gt10: createValidation([gt10Validator]),
    };
    const values = {
      odd: 4,
      even: 5,
      gt10: 25,
    };

    const result = toValidationResult(values, validators);
    expect(result).toBeInstanceOf(Object);
    expect(result.isValid).toBe(true);
    expect(result.warnings).toHaveLength(0);
    expect(result.fields.odd.isValid).toBe(true);
    expect(result.fields.odd.warnings).toHaveLength(0);
    expect(result.fields.even.isValid).toBe(true);
    expect(result.fields.even.warnings).toHaveLength(0);
    expect(result.fields.gt10.isValid).toBe(true);
    expect(result.fields.gt10.warnings).toHaveLength(0);
  });

  it('should validate nested objects', () => {
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
        even: 7,
        bar: {
          gt10: 25,
        }
      }
    };

    const result = toValidationResult(values, validators);
    expect(result).toBeInstanceOf(Object);
    expect(result.isValid).toBe(true);
    expect(result.warnings).toHaveLength(0);
    expect(result.fields.odd.isValid).toBe(true);
    expect(result.fields.odd.warnings).toHaveLength(0);
    expect(result.fields.foo.fields.even.isValid).toBe(true);
    expect(result.fields.foo.fields.even.warnings).toHaveLength(0);
    expect(result.fields.foo.fields.bar.fields.gt10.isValid).toBe(true);
    expect(result.fields.foo.fields.bar.fields.gt10.warnings).toHaveLength(0);
  });

  it('should produce the correct warnings', () => {
    const validators = {
      odd: createValidation([oddValidator]),
      even: createValidation([evenValidator]),
      gt10: createValidation([gt10Validator]),
    };
    const values = {
      odd: 5,
      even: 6,
      gt10: 7,
    };

    const result = toValidationResult(values, validators);
    expect(result).toBeInstanceOf(Object);
    expect(result.isValid).toBe(false);
    expect(result.warnings).toHaveLength(3);
    expect(result.warnings[0]).toBe(oddValidator.message);
    expect(result.warnings[1]).toBe(evenValidator.message);
    expect(result.warnings[2]).toBe(gt10Validator.message);
    expect(result.fields.odd.isValid).toBe(false);
    expect(result.fields.odd.warnings).toHaveLength(1);
    expect(result.fields.even.isValid).toBe(false);
    expect(result.fields.even.warnings).toHaveLength(1);
    expect(result.fields.gt10.isValid).toBe(false);
    expect(result.fields.gt10.warnings).toHaveLength(1);
  });

});