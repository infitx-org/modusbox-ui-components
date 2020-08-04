import createValidation, { createOptionalValidation, createValidator } from '../creators';
import toValidationResult, { validate } from '../runner';

const oddMessage = 'is odd number';
const oddFn = value => typeof value === 'number' && value % 2 === 1;

const evenMessage = 'is even number';
const evenFn = value => typeof value === 'number' && value % 2 === 0;

const gt10Message = 'is greater than 10';
const gt10fn = value => value > 10;

const oddValidator = createValidator(oddMessage, oddFn);
const evenValidator = createValidator(evenMessage, evenFn);
const gt10Validator = createValidator(gt10Message, gt10fn);

const testValidation = createValidation([oddValidator, gt10Validator]);

describe('tests validating a value', () => {
  it('should return hasWarnings and isValid object keys', () => {
    const result = validate(10, testValidation);
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('messages');
    expect(result).toHaveProperty('isValid');
    expect(result.messages).toBeInstanceOf(Object);
    expect(result.messages[0]).toHaveProperty('active');
    expect(result.messages[0]).toHaveProperty('message');
  });

  it('should result in a successfull validation', () => {
    const result = validate(21, testValidation);
    const allInactiveWarnings = result.messages.every(w => w.active === false);
    expect(result.messages).toHaveLength(2);
    expect(allInactiveWarnings).toBe(true);
    expect(result.isValid).toBe(true);
  });

  it('should result in a successfull validation and produce non-active messages when the skipWarning is set', () => {
    const evenValidation = createOptionalValidation([evenValidator]);
    const result = validate(undefined, evenValidation);
    expect(result.messages).toHaveLength(1);
    expect(result.messages[0].message).toBe(evenMessage);
    expect(result.messages[0].active).toBeUndefined();
    expect(result.isValid).toBe(true);
  });

  it('should result in a failed validation and produce active messages', () => {
    const result = validate(12, testValidation);
    const allInactiveWarnings = result.messages.every(w => w.active === false);
    expect(allInactiveWarnings).toBe(false);
    expect(result.messages).toHaveLength(2);
    expect(result.messages[0]).toBeInstanceOf(Object);
    expect(result.messages[0].message).toBe(oddMessage);
    expect(result.messages[0].active).toBe(true);
    expect(result.isValid).toBe(false);
  });

  it('should result in a failed validation and produce active messages when the skipWarning and value is set', () => {
    const evenValidation = createOptionalValidation([evenValidator]);
    const result = validate(5, evenValidation);
    expect(result.messages).toHaveLength(1);
    expect(result.messages[0].message).toBe(evenMessage);
    expect(result.messages[0].active).toBe(true);
    expect(result.isValid).toBe(false);
  });

  it('should not try to validate an undefined value', () => {
    const evenValidation = createValidation([evenValidator]);
    const result = validate(undefined, evenValidation);
    expect(result.messages).toHaveLength(1);
    expect(result.isValid).toBe(false);
  });
});

describe('tests validating a value set', () => {
  it('should return messages and isValid object keys', () => {
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
    expect(result).toHaveProperty('messages');
    expect(result).toHaveProperty('isValid');
    expect(result).toHaveProperty('fields');
    expect(result.fields).toHaveProperty('odd');
    expect(result.fields).toHaveProperty('even');
    expect(result.fields).toHaveProperty('gt10');
    expect(result.fields.odd).toHaveProperty('isValid');
    expect(result.fields.odd).toHaveProperty('messages');
    expect(result.fields.even).toHaveProperty('isValid');
    expect(result.fields.even).toHaveProperty('messages');
    expect(result.fields.gt10).toHaveProperty('isValid');
    expect(result.fields.gt10).toHaveProperty('messages');
  });

  it('should validate the whole object', () => {
    const validators = {
      odd: createValidation([oddValidator]),
      even: createValidation([evenValidator]),
      gt10: createValidation([gt10Validator]),
    };
    const values = {
      odd: 3,
      even: 4,
      gt10: 25,
    };

    const result = toValidationResult(values, validators);
    expect(result).toBeInstanceOf(Object);
    expect(result.isValid).toBe(true);
    expect(result.messages).toHaveLength(3);
    expect(result.fields.odd.isValid).toBe(true);
    expect(result.fields.odd.messages).toHaveLength(1);
    expect(result.fields.even.isValid).toBe(true);
    expect(result.fields.even.messages).toHaveLength(1);
    expect(result.fields.gt10.isValid).toBe(true);
    expect(result.fields.gt10.messages).toHaveLength(1);
  });

  it('should validate nested objects', () => {
    const validators = {
      odd: createValidation([oddValidator]),
      foo: {
        even: createValidation([evenValidator]),
        bar: {
          gt10: createValidation([gt10Validator]),
        },
      },
    };
    const values = {
      odd: 3,
      foo: {
        even: 8,
        bar: {
          gt10: 25,
        },
      },
    };

    const result = toValidationResult(values, validators);
    expect(result).toBeInstanceOf(Object);
    expect(result.isValid).toBe(true);
    expect(result.messages).toHaveLength(3);
    expect(result.fields.odd.isValid).toBe(true);
    expect(result.fields.odd.messages).toHaveLength(1);
    expect(result.fields.foo.fields.even.isValid).toBe(true);
    expect(result.fields.foo.fields.even.messages).toHaveLength(1);
    expect(result.fields.foo.fields.bar.fields.gt10.isValid).toBe(true);
    expect(result.fields.foo.fields.bar.fields.gt10.messages).toHaveLength(1);
  });

  it('should produce the correct messages', () => {
    const validators = {
      odd: createValidation([oddValidator]),
      even: createOptionalValidation([evenValidator]),
      gt10: createValidation([gt10Validator]),
    };
    const values = {
      odd: 4,
      even: undefined,
      gt10: 17,
    };

    const result = toValidationResult(values, validators);
    expect(result).toBeInstanceOf(Object);

    expect(result.isValid).toBe(false);
    expect(result.fields.odd.isValid).toBe(false);
    expect(result.fields.even.isValid).toBe(true);
    expect(result.fields.gt10.isValid).toBe(true);

    expect(result.messages).toHaveLength(3);
    expect(result.messages[0].message).toBe(oddValidator.message);
    expect(result.messages[1].message).toBe(evenValidator.message);
    expect(result.messages[2].message).toBe(gt10Validator.message);
    expect(result.messages[0].active).toBe(true);
    expect(result.messages[1].active).toBe(undefined);
    expect(result.messages[2].active).toBe(false);

    expect(result.fields.odd.messages).toHaveLength(1);
    expect(result.fields.odd.messages[0].active).toBe(true);
    expect(result.fields.even.messages).toHaveLength(1);
    expect(result.fields.even.messages[0].active).toBe(undefined);
    expect(result.fields.gt10.messages).toHaveLength(1);
    expect(result.fields.gt10.messages[0].active).toBe(false);
  });
});
