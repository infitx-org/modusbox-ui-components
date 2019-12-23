const isNull = item => item === null;
const isUndefined = item => item === undefined;
const isObject = item => typeof item === 'object';
const isPrimitiveObject = item => isObject(item) && !Array.isArray(item);

function getValueAndMissingCards(value, availableOptions, selectors) {
  if (!value) {
    return { value, tokens: [] };
  }

  const [open, close] = selectors;
  const availableLabels = availableOptions.map(option => option.label);

  function defineToken(tokenValue) {
    const wrapped = tokenValue.startsWith(open) && tokenValue.endsWith(close);
    return {
      wrapped,
      value: tokenValue
        .split('%%%')
        .join(`\\${open}`)
        .slice(wrapped ? 1 : 0)
        .slice(0, wrapped ? -1 : undefined),
    };
  }

  function replaceWithTokenValue(token) {
    if (!token.wrapped) {
      return token.value;
    }
    const mapping = availableOptions.find(option => option.label === token.value);
    return mapping ? mapping.value : '';
  }

  const tokens = value
    .split(`\\${open}`)
    .join('%%%')
    .split(new RegExp(`(\\${open}[^\\${open}\\${close}]*[\\${close}]*)`))
    .filter(str => str !== '')
    .map(defineToken);

  return {
    value: tokens.map(replaceWithTokenValue).join(''),
    tokens: tokens
      .filter(token => token.wrapped)
      .map(token => ({
        value: token.value,
        available: availableLabels.includes(token.value),
        replaced: replaceWithTokenValue(token),
      })),
  };
}

const validate = (initialValue, validation) => {
  let tokens = [];
  let messages = [];
  let isValid = true;
  const { isRequired } = validation;

  if (!isUndefined(validation)) {
    let value = initialValue;
    const { selectors, options, validators } = validation;

    if (selectors) {
      ({ tokens, value } = getValueAndMissingCards(initialValue, options, selectors));
      const missingVars = tokens.filter(v => !v.available);

      if (missingVars.length) {
        return {
          isRequired,
          tokens,
          isValid: false,
          messages: [
            {
              active: true,
              message: `${missingVars.map(v => v.value).join(', ')} were not found`,
            },
          ],
        };
      }
    }

    messages = validators.map(({ message }) => ({ active: false, message }));

    validators.forEach((validator, index) => {
      const { fn } = validator;
      if (isUndefined(value) && !isRequired) {
        isValid = true;
        messages[index].active = undefined;
      } else if (isUndefined(value) && isRequired) {
        isValid = false;
        messages[index].active = undefined;
      } else {
        const succeeded = fn(value);
        if (!succeeded) {
          isValid = false;
        }
        messages[index].active = !succeeded;
      }
      if (tokens.filter(v => !v.available).length) {
        isValid = false;
      }
    });
  }
  return { tokens, messages, isValid, isRequired };
};

// test every properties for its own validation
const toValidationResult = (model = {}, validations = {}) => {
  const fields = Object.keys(validations);
  const messages = [];
  const tokens = [];
  const results = {};
  let isValid = true;

  fields.forEach(field => {
    if (!isNull(model)) {
      const value = model[field];
      const validation = validations[field];
      let result = { isValid: true, messages: [], tokens: [] };

      if (isPrimitiveObject(value)) {
        // the value is an object, needs to be recursively tested
        result = toValidationResult(value, validation);
      } else if (!isUndefined(validation)) {
        result = validate(value, validation);
      }

      if (!result.isValid) {
        isValid = false;
      }

      messages.push(...result.messages);
      tokens.push(...result.tokens);

      results[field] = result;
    }
  });

  return { isValid, messages, tokens, fields: results };
};

export { validate };
export default toValidationResult;
