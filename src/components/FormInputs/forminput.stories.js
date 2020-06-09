/* eslint no-console: "off" */
import React, { useState } from 'react';

import FormInput, { FormInputs } from '../../components/FormInputs';
import { createValidation, toValidationResult, vd } from '../../reduxValidation';

export default {
  title: 'FormInputs',
  component: FormInputs,
};

const description = {
  name: 'Describes the user name given at birth',
  lastname: 'Describes the user lastname inherited by the parents',
  description: 'Describes what is the main social role of the user',
  sex: 'Describes wheter the user is male or female',
  age: 'Describes how long the user has lived on this planet',
};

const url = {
  name: 'https://www.modusbox.com',
  lastname: 'https://www.modusbox.com',
  description: 'https://www.modusbox.com',
  sex: 'https://www.modusbox.com',
  age: 'https://www.modusbox.com',
};

const model = {
  name: undefined,
  lastname: 'test-lastname',
  description: 'The quick brown fox jumps over the lazy dog\n and find a friend for life',
  sex: 'unisex',
  age: 42,
};

const validation = {
  name: createValidation([vd.isRequired, vd.maxLength(10)]),
  lastname: createValidation([vd.isRequired, vd.maxLength(10)]),
  description: createValidation([vd.isRequired, vd.maxLength(10)]),
  sex: createValidation([vd.isRequired]),
  age: createValidation([vd.isRequired, vd.isNum]),
};

const ages = new Array(100).fill(0).map((_, index) => ({ label: index, value: index }));
const sexes = [
  {
    label: 'male',
    value: 'male',
  },
  {
    label: 'female',
    value: 'female',
  },
  {
    label: 'unisex',
    value: 'unisex',
  },
];

export const TypeText = () => (
  <FormInput onChange={console.log} value="this is an input" type="text" label="name" />
);

export const TypeArea = () => (
  <FormInput onChange={console.log} value="this is a textarea" type="area" label="name" />
);

export const TypeCheckbox = () => (
  <FormInput onChange={console.log} checked="test" type="checkbox" label="name" />
);

export const TypeRadio = () => (
  <FormInput onChange={console.log} value="test" options={sexes} type="radio" label="name" />
);

export const TypeSelect = () => (
  <FormInput onChange={console.log} options={sexes} type="select" label="name" />
);

export const TypeFileuploader = () => (
  <FormInput onChange={console.log} options={sexes} type="file" label="name" />
);

export const TypeDate = () => (
  <FormInput onChange={console.log} options={sexes} type="date" label="name" />
);

export const Wrapped = () => {
  const [value, onChange] = useState(model);
  const onChangeField = field => {
    return onChange({ ...value, [field.prop]: field.value });
  };

  const validationResult = toValidationResult(value, validation);
  return (
    <div>
      <FormInputs
        onChange={onChangeField}
        data={value}
        validation={validationResult}
        title="Form section"
        description={description}
        url={url}
      >
        <FormInput type="text" label="name" name="name" />
        <FormInput type="text" label="lastname" name="lastname" />
        <FormInput type="area" label="description" name="description" />
        <FormInput type="select" label="age" name="age" options={ages} />
        <FormInput type="radio" label="sex" name="sex" options={sexes} />
      </FormInputs>
    </div>
  );
};

export const Unwrapped = () => {
  const [size, onChangeSize] = useState('l');
  const [value, onChange] = useState(model);
  const onChangeField = field => fieldValue => {
    return onChange({ ...value, [field]: fieldValue });
  };

  const validationResult = toValidationResult(value, validation);
  return (
    <div>
      <FormInput
        onChange={onChangeSize}
        value={size}
        type="radio"
        options={[
          { label: 's', value: 's' },
          { label: 'm', value: 'm' },
          { label: 'l', value: 'l' },
        ]}
        label="size"
      />
      <FormInput
        size={size}
        onChange={onChangeField('name')}
        value={value.name}
        validation={validationResult.fields.name}
        type="text"
        label="name"
        description={description.name}
        url={url.name}
        name="name"
      />
      <FormInput
        size={size}
        onChange={onChangeField('lastname')}
        value={value.lastname}
        validation={validationResult.fields.lastname}
        type="text"
        label="lastname"
        description={description.lastname}
        url={url.lastname}
        name="lastname"
      />
      <FormInput
        size={size}
        onChange={onChangeField('description')}
        value={value.description}
        validation={validationResult.fields.description}
        type="area"
        label="description"
        description={description.description}
        url={url.description}
        name="description"
      />
      <FormInput
        size={size}
        onChange={onChangeField('age')}
        value={value.age}
        validation={validationResult.fields.age}
        type="select"
        label="age"
        description={description.age}
        url={url.age}
        name="age"
        options={ages}
      />
      <FormInput
        onChange={onChangeField('sex')}
        value={value.sex}
        validation={validationResult.fields.sex}
        type="radio"
        label="sex"
        description={description.sex}
        url={url.sex}
        name="sex"
        options={sexes}
      />
    </div>
  );
};
