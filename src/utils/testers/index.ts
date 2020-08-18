import _isEqual from 'lodash/isEqual';

type AnyValue = boolean | number | string | null | undefined | object;

const isDefined = (value: AnyValue): boolean => value !== undefined;

const isUndefined = (value: AnyValue): boolean => value === undefined;

const isEqual = (a: AnyValue, b: AnyValue): boolean => _isEqual(a, b);

const isNotEqual = (a: AnyValue, b: AnyValue): boolean => !_isEqual(a, b);

const isNil = (value: AnyValue): boolean => value === undefined || value === null;

const isNotNil = (value: AnyValue): boolean => value !== undefined && value !== null;

const isNotEmptyCollection = (collection: AnyValue[]): boolean => collection.length > 0;

const getAnyIs = (value: AnyValue) => (...args: AnyValue[]): boolean =>
  args.some((arg) => arg === value);

const getAllAre = (value: AnyValue) => (...args: AnyValue[]): boolean =>
  args.every((arg) => arg === value);

const getAnyIsDefined = (...args: AnyValue[]): boolean => args.some(isDefined);

const getAnyIsNotNil = (...args: AnyValue[]): boolean => args.some(isNotNil);

export default {
  getAnyIs,
  getAllAre,
  getAnyIsDefined,
  getAnyIsNotNil,
  isNotEqual,
  isDefined,
  isNil,
  isNotNil,
  isUndefined,
  isEqual,
  isNotEmptyCollection,
};
