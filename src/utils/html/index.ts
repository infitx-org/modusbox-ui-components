// eslint-disable-next-line
const isString = (item: any): boolean => typeof item === 'string';

type ClassNameItem = string | boolean | undefined;

const composeClassName = (items: ClassNameItem[] = []) => {
  if (!Array.isArray(items)) {
    throw new Error('Class name should be wrapped into an array');
  }
  return items.filter(isString).join(' ');
};

const composeOption = (label: string, value: string | number | boolean) => ({ label, value });

const composeOptions = (sourceMaps: { [label: string]: string | number | boolean }) => {
  return Object.entries(sourceMaps).map(sourceMap => {
    const [label, value] = sourceMap;
    return composeOption(label, value);
  });
};

export {
  composeOption,
  composeOptions,
};
