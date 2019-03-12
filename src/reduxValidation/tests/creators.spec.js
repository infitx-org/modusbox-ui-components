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

describe('tests the validatation creator', () => {

  it('should build the validation as array', () => {
    const validation = createValidation([testValidator]);
    expect(validation).toBeInstanceOf(Array);
    expect(validation).toHaveLength(1);
    expect(validation[0].message).toBe(testValidator.message);
    expect(validation[0].fn).toBe(testValidator.fn);
  });

  it('should build the validation array items correctly', () => {
    const otherValidator = createValidator('other message', value => value > 0);
    const optionalValidator = createValidator('optional message', value => value < 0);
    const validation = createValidation([
      testValidator,
      otherValidator,
      optionalValidator,
    ]);
    const [firstValidation, secondValidation, thirdValidation] = validation;

    expect(validation).toHaveLength(3);

    expect(firstValidation.fn).toBe(testValidator.fn);
    expect(firstValidation.message).toBe(testValidator.message);
    expect(firstValidation.required).toBe(true);

    expect(secondValidation.fn).toBe(otherValidator.fn);
    expect(secondValidation.message).toBe(otherValidator.message);
    expect(secondValidation.required).toBe(true);

    expect(thirdValidation.fn).toBe(optionalValidator.fn);
    expect(thirdValidation.message).toBe(optionalValidator.message);
    expect(thirdValidation.required).toBe(true);
  });

});
