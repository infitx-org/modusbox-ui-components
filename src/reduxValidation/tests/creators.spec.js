import createValidation, { createValidator } from '../creators';

const message = 'Test message';
const fn = value => value % 2 === 0;
const testValidator = createValidator(message, fn);

describe('tests the validator creator', () => {

  it('should build the validator object correctly', () => {
    const skipWarnings = false;
    const validator = createValidator(message, fn, skipWarnings);

    expect(validator).toBeInstanceOf(Object);
    expect(validator.optional).toBeInstanceOf(Object);
    expect(validator.message).toBe(message);
    expect(validator.fn).toBe(fn);
    expect(validator.skipWarnings).toBe(skipWarnings);
    expect(validator.required).toBe(true);
    expect(validator.optional.message).toBe(message);
    expect(validator.optional.skipWarnings).toBe(skipWarnings);
    expect(validator.optional.fn).not.toBe(fn);
    expect(validator.optional.required).toBe(false);
  });

  it('should default to not skip the warnings', () => {
    expect(testValidator.skipWarnings).toBe(false);
    expect(testValidator.optional.skipWarnings).toBe(false);
  });

  it('should run the optional validation function when value is defined', () => {
    const value = 4;

    expect(testValidator.fn(value)).toBe(true);
    expect(testValidator.optional.fn(value)).toBe(true);
  });

  it('should return "true" for the optional validation function when value is not defined', () => {
    const value = undefined;

    expect(testValidator.fn(value)).toBe(false);
    expect(testValidator.optional.fn(value)).toBe(true);
  });

});

describe('tests the validatation creator', () => {

  it('should build the validation as array', () => {
    const validation = createValidation([testValidator]);
    expect(validation).toBeInstanceOf(Array);
    expect(validation).toHaveLength(1);
  });

  it('should build the validation array items correctly', () => {
    const otherValidator = createValidator('other message', value => value > 0);
    const optionalValidator = createValidator('optional message', value => value < 0);
    const validation = createValidation([
      testValidator,
      otherValidator,
      optionalValidator.optional
    ]);
    const [firstValidation, secondValidation, thirdValidation] = validation;

    expect(validation).toHaveLength(3);
    
    expect(firstValidation.skipWarnings).toBe(testValidator.skipWarnings);
    expect(firstValidation.fn).toBe(testValidator.fn);
    expect(firstValidation.message).toBe(testValidator.message);
    expect(firstValidation.required).toBe(testValidator.required);

    expect(secondValidation.skipWarnings).toBe(otherValidator.skipWarnings);
    expect(secondValidation.fn).toBe(otherValidator.fn);
    expect(secondValidation.message).toBe(otherValidator.message);
    expect(secondValidation.required).toBe(otherValidator.required);

    expect(thirdValidation.skipWarnings).toBe(optionalValidator.skipWarnings);
    expect(thirdValidation.fn).not.toBe(optionalValidator.fn);
    expect(thirdValidation.message).toBe(optionalValidator.message);
    expect(thirdValidation.required).not.toBe(optionalValidator.required);
  });

});
