type AnyType = boolean | number | string | null | undefined;
type JsonType = {
  [key: string]: AnyType | JsonType;
};

const setItem = (key: string, value: AnyType | JsonType) => {
  const stringified = JSON.stringify(value);
  if (value !== undefined) {
    localStorage.setItem(key, stringified);
  } else {
    localStorage.removeItem(key);
  }
};

const getItem = (key: string): AnyType | JsonType => {
  let parsed;

  try {
    parsed = JSON.parse(localStorage.getItem(key));
  } catch (e) {
    // eslint-disable-next-line
    // console.error(`Unable to read from storage "${key}"; The key will be removed. \nError: ${e}`);
    localStorage.removeItem(key);
  }
  return parsed;
};

const removeItem = (key: string) => localStorage.removeItem(key);

export { setItem, getItem, removeItem };
