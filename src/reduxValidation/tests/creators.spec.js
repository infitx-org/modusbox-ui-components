import createValidation, { createOptionalValidation, createValidator } from '../creators';

const message = 'Test message';
const fn = value => value % 2 === 0;
const testValidator = createValidator(message, fn);

describe('tests the validator creator', () => {
  it('should build the validator object correctly', () => {
    const validator = createValidator(message, fn);

    expect(validator).toBeInstanceOf(Object);
    expect(validator.message).toBe(message);
    expect(validator.fn).toBe(fn);
  });

  it('should run the optional validation function when value is defined', () => {
    const value = 4;
    expect(testValidator.fn(value)).toBe(true);
  });
});

describe('tests the validation creators', () => {
  it('should build the validation as array', () => {
    const validation = createValidation([testValidator]);
    const { validators, isRequired } = validation;
    expect(isRequired).toBe(true);
    expect(validators).toBeInstanceOf(Array);
    expect(validators).toHaveLength(1);
    expect(validators[0].message).toBe(testValidator.message);
    expect(validators[0].fn).toBe(testValidator.fn);
  });

  it('should build the validation array items correctly', () => {
    const otherValidator = createValidator('other message', value => value > 0);
    const customValidator = createValidator('custom message', value => value < 0);
    const validation = createValidation([testValidator, otherValidator, customValidator]);
    const { validators, isRequired } = validation;
    const [firstValidator, secondValidator, thirdValidator] = validators;

    expect(validators).toHaveLength(3);
    expect(isRequired).toBe(true);

    expect(firstValidator.fn).toBe(testValidator.fn);
    expect(firstValidator.message).toBe(testValidator.message);

    expect(secondValidator.fn).toBe(otherValidator.fn);
    expect(secondValidator.message).toBe(otherValidator.message);

    expect(thirdValidator.fn).toBe(customValidator.fn);
    expect(thirdValidator.message).toBe(customValidator.message);
  });

  it('should build the optional validation with non required validators', () => {
    const validation = createOptionalValidation([testValidator]);
    const { validators, isRequired } = validation;
    const [firstValidator] = validators;
    expect(isRequired).toBe(false);
    expect(validators).toBeInstanceOf(Array);
    expect(validators).toHaveLength(1);
    expect(firstValidator.message).toBe(testValidator.message);
    expect(firstValidator.fn).toBe(testValidator.fn);
  });

  it('should build the optional validation array items correctly', () => {
    const otherValidator = createValidator('other message', value => value > 0);
    const customValidator = createValidator('optional message', value => value < 0);
    const validation = createOptionalValidation([testValidator, otherValidator, customValidator]);
    const { validators, isRequired } = validation;
    const [firstValidator, secondValidator, thirdValidator] = validators;

    expect(isRequired).toBe(false);
    expect(validators).toHaveLength(3);

    expect(firstValidator.fn).toBe(testValidator.fn);
    expect(firstValidator.message).toBe(testValidator.message);

    expect(secondValidator.fn).toBe(otherValidator.fn);
    expect(secondValidator.message).toBe(otherValidator.message);

    expect(thirdValidator.fn).toBe(customValidator.fn);
    expect(thirdValidator.message).toBe(customValidator.message);
  });
});
