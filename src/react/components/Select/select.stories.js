/* eslint no-console: "off" */
import { createOptionalValidation, validate, vd } from 'javascript/validation';
import React, { useState } from 'react';

import Select from './Select';

export default {
  title: 'Select',
  component: Select,
};

const options = [
  {
    label: 'With an icon',
    value: 'withicon',
    icon: 'deploy-small',
  },
  {
    label: new Array(50)
      .fill('super')
      .join(' ')
      .toString()
      .concat(' long'),
    value: 'superStrangeValue',
  },
  {
    label: 'disabled',
    value: 'disabled',
    disabled: true,
  },
  ...[...Array(20)].map(optionMaker),
];

function optionMaker(item, index) {
  return {
    label: `option number ${index + 1}`,
    value: `value number ${index}`,
  };
}

export const Default = () => (
  <div className="m5">
    <Select options={options} type="text" placeholder="Default" />
  </div>
);

export const WithPending = () => (
  <div className="m5">
    <Select options={options} pending placeholder="Pending" />
  </div>
);

export const WithInvalid = () => (
  <div className="m5">
    <Select options={options} invalid placeholder="Invalid" />
  </div>
);

export const WithValidation = () => {
  const [value, setValue] = useState(undefined);
  const validators = createOptionalValidation([vd.isEmail, vd.maxLength(10), vd.isNum, vd.isText]);
  const validationResult = validate(value, validators);
  return (
    <div className="m5">
      <Select
        options={options}
        placeholder="Validation"
        value={value}
        onChange={setValue}
        invalid={!validationResult.isValid}
        invalidMessages={validationResult.messages}
      />
    </div>
  );
};

export const WithRequired = () => (
  <div className="m5">
    <Select options={options} required placeholder="Required" />
  </div>
);

export const WithDisabled = () => (
  <div className="m5">
    <Select options={options} disabled placeholder="Disabled" />
  </div>
);

export const WithIcon = () => (
  <div className="m5">
    <Select options={options} icon="close-small" placeholder="Icon" />
  </div>
);

export const WithPasswordPending = () => (
  <div className="m5">
    <Select options={options} type="password" pending placeholder="PasswordPending" />
  </div>
);

export const WithRequiredAndDisabled = () => (
  <div className="m5">
    <Select options={options} placeholder="Required Disabled" required disabled />
  </div>
);

export const WithRequiredDisabledInval = () => (
  <div className="m5">
    <Select options={options} required disabled invalid placeholder="RequiredDisabledInvalid" />
  </div>
);

export const WithSmall = () => (
  <div className="m5">
    <Select options={options} size="s" placeholder="Small" />
  </div>
);

export const WithMedium = () => (
  <div className="m5">
    <Select options={options} size="m" placeholder="Medium" />
  </div>
);

export const WithLarge = () => (
  <div className="m5">
    <Select options={options} size="l" placeholder="Large" />
  </div>
);

export const WithSmallPending = () => (
  <div className="m5">
    <Select options={options} size="s" pending placeholder="Small" />
  </div>
);

export const WithMediumPending = () => (
  <div className="m5">
    <Select options={options} size="m" pending placeholder="Medium" />
  </div>
);

export const WithLargePending = () => (
  <div className="m5">
    <Select options={options} size="l" pending placeholder="Large" />
  </div>
);

export const WithEvents = () => (
  <div className="m5">
    <Select
      options={options}
      placeholder="Events (console)"
      onChange={value => console.log('onChange', value)}
      onClick={() => console.log('onClick')}
      onKeyPress={() => console.log('onKeyPress')}
      onEnter={() => console.log('onEnter')}
      onBlur={() => console.log('onBlur')}
      onFocus={() => console.log('onFocus')}
    />
  </div>
);
