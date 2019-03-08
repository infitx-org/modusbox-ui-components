import { createValidator } from './creators';

/* eslint-disable-next-line max-len */
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// single validators, use the create validator function to create them
// FIXME: remove all unused validators. Many of these are making large assumptions, and many will
// not ever be necessary in MBAM.
const vd = {
  isURL: createValidator(
    'Must be a valid URL https://url.com/path, http://url.com:8080, http://localhost:8080',
    value => /^(ftp|http|https):\/\/[^ "]+$/.test(value)
  ),
  isHost: createValidator('Must be a valid host (IP or hostname)', value => {
    // eslint-disable-next-line
    const ValidIpAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    const urlChunkHostnameRegex = /^(?![0-9.]{2})([a-zA-Z0-9-]*)([a-zA-Z0-9]{1})$/;
    return (
      ValidIpAddressRegex.test(value) ||
      (value !== undefined && value.split('.').every(chunk => urlChunkHostnameRegex.test(chunk)))
    );
  }),
  isPort: createValidator(
    'Must be a valid port',
    // eslint-disable-next-line
    value => !Number.isNaN(value) || value === '${http.port}' || value === '${https.port}'
  ),
  isPassword: createValidator('Must be a valid password', value =>
    /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(value)
  ),
  isEmail: createValidator('Must be a valid Email address', value =>
    value ? EMAIL_REGEX.test(value) : false
  ),
  isNum: createValidator('Must be a number', value => !Number.isNaN(value)),
  isPhoneNum: createValidator('Must be a phone number', value => /^(\+?)[0-9.]*$/.test(value)),
  isText: createValidator('Must be text content', value => /^[a-zA-Z '.]*$/.test(value)),
  isAlpha: createValidator('Must be alphanumeric', value => /^[a-zA-Z]*$/.test(value)),
  isAlphaNum: createValidator('Must be alphanumeric', value => /^[a-zA-Z0-9]*$/.test(value)),
  isAlphaNumExtended: createValidator('Must be alphanumeric with extended characters', value =>
    /^[a-zA-Z0-9:_-]*$/.test(value)
  ),
  isAlphaNumExtendedWithDots: createValidator(
    'Must be alphanumeric with extended characters and dots',
    value => /^[a-zA-Z0-9.:_-]*$/.test(value)
  ),
  isAlphaNumExtendedWithBrackets: createValidator(
    'Must be alphanumeric with extended characters and brackets',
    value => /^[a-zA-Z0-9():_-]*$/.test(value)
  ),
  isFilename: createValidator('Must have a valid filename', value =>
    /^[a-zA-Z0-9.:_-]*$/.test(value)
  ),
  hasValue: createValidator(
    'Must have a value',
    value => value !== undefined && value.replace(/ /g, '').length > 0
  ),
  isRequired: createValidator('Required field', value => typeof value !== 'undefined'),
  isNotEmptyString: createValidator(
    'Must not be an empty string',
    value => value !== undefined && value.replace(/ /g, '').length > 0
  ),
  // eslint-disable-next-line
  isCharacter: createValidator(
    'Cannot be an alphanumeric character',
    value => !/^[a-zA-Z0-9 ]*$/.test(value)
  ),
  noSpace: createValidator('Must not contain any space', value => !/\s/g.test(value)),
  
  // configurable validators
  isPositive: createValidator('Must be positive', value => {
    if (value === undefined) {
      return true;
    } else if (!Number.isNaN(value)) {
      return value >= 0;
    }
    return false;
  }),
  maxLength: length =>
    createValidator(
      `Max length is ${length} character`,
      value => (value === undefined ? true : value.length <= length)
    ),
  isLong: length =>
    createValidator(`Must be ${length} characters`, value => value && value.length === length),
  isLongBetween: (start, stop) =>
    createValidator(
      `Must have from ${start} to ${stop} characters`,
      value => value && value.length >= start && value.length <= stop
    ),

  forcedResult: (isValid, message) => createValidator(message, () => isValid),
};

export default vd;