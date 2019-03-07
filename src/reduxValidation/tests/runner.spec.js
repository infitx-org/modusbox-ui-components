import createValidation, { createValidator } from '../creators';
import toValidationResult, { validate } from '../runner';

const oddMessage = 'is odd number';
const oddFn = value => value % 2 === 0;

const evenMessage = 'is even number';
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
    expect(result.warnings).toBeInstanceOf(Object);
    expect(result.warnings[0]).toHaveProperty('active');
    expect(result.warnings[0]).toHaveProperty('message');
  });

  it('should result in a successfull validation', () => {
    const result = validate(20, testValidation);
    const allInactiveWarnings = result.warnings.every(w => w.active === false);
    expect(result.warnings).toHaveLength(2);
    expect(allInactiveWarnings).toBe(true);
    expect(result.isValid).toBe(true);
  });

  it('should result in a failed validation and produce active warnings', () => {
    const result = validate(11, testValidation);
    expect(result.warnings).toHaveLength(2);
    expect(result.warnings[0]).toBeInstanceOf(Object);
    expect(result.warnings[0].message).toBe(oddMessage);
    expect(result.warnings[0].active).toBe(true);
    expect(result.isValid).toBe(false);
  });

  it('should result in a failed validation and produce non-active warnings when the skipWarning is set', () => {
    const evenValidation = createValidation([evenValidatorSkipWarnings])
    const result = validate(4, evenValidation);
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].message).toBe(evenMessage);
    expect(result.warnings[0].active).toBeUndefined();
    expect(result.isValid).toBe(false);
  });

  it('should not try to validate an undefined value', () => {
    const evenValidation = createValidation([evenValidator])
    const result = validate(undefined, evenValidation);
    expect(result.warnings).toHaveLength(1);
    expect(result.isValid).toBe(true);
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
    expect(result.warnings).toHaveLength(3);
    expect(result.fields.odd.isValid).toBe(true);
    expect(result.fields.odd.warnings).toHaveLength(1);
    expect(result.fields.even.isValid).toBe(true);
    expect(result.fields.even.warnings).toHaveLength(1);
    expect(result.fields.gt10.isValid).toBe(true);
    expect(result.fields.gt10.warnings).toHaveLength(1);
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
    expect(result.warnings).toHaveLength(3);
    expect(result.fields.odd.isValid).toBe(true);
    expect(result.fields.odd.warnings).toHaveLength(1);
    expect(result.fields.foo.fields.even.isValid).toBe(true);
    expect(result.fields.foo.fields.even.warnings).toHaveLength(1);
    expect(result.fields.foo.fields.bar.fields.gt10.isValid).toBe(true);
    expect(result.fields.foo.fields.bar.fields.gt10.warnings).toHaveLength(1);
  });

  it('should produce the correct warnings', () => {
    const validators = {
      odd: createValidation([oddValidator]),
      even: createValidation([evenValidatorSkipWarnings]),
      gt10: createValidation([gt10Validator]),
    };
    const values = {
      odd: 5,
      even: 4,
      gt10: 17,
    };

    const result = toValidationResult(values, validators, true);
    expect(result).toBeInstanceOf(Object);

    expect(result.isValid).toBe(false);
    expect(result.fields.odd.isValid).toBe(false);
    expect(result.fields.even.isValid).toBe(false);
    expect(result.fields.gt10.isValid).toBe(true);

    expect(result.warnings).toHaveLength(3);
    expect(result.warnings[0].message).toBe(oddValidator.message);
    expect(result.warnings[1].message).toBe(evenValidator.message);
    expect(result.warnings[2].message).toBe(gt10Validator.message);
    expect(result.warnings[0].active).toBe(true);
    expect(result.warnings[1].active).toBe(undefined);
    expect(result.warnings[2].active).toBe(false);

    expect(result.fields.odd.warnings).toHaveLength(1);
    expect(result.fields.odd.warnings[0].active).toBe(true);
    expect(result.fields.even.warnings).toHaveLength(1);
    expect(result.fields.even.warnings[0].active).toBe(undefined);
    expect(result.fields.gt10.warnings).toHaveLength(1);
    expect(result.fields.gt10.warnings[0].active).toBe(false);
  });

});