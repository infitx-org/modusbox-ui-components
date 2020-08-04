/* eslint no-console: "off" */
import { createOptionalValidation, validate, vd } from 'utils/validation';
import React, { useState } from 'react';

import RadioGroup from './RadioGroup';

export default {
  title: 'RadioGroup',
  component: RadioGroup,
};

function optionMaker(item, index) {
  return {
    label: `option number ${index + 1}`,
    value: `value number ${index}`,
  };
}

const options = [
  {
    label: 'disabled',
    value: 'disabled',
    disabled: true,
  },
  ...[...Array(3)].map(optionMaker),
];

const { value } = options[2];

export const Default = () => (
  <div className="m5">
    <RadioGroup options={options} type="text" placeholder="Default" value={value} />
  </div>
);

export const WithDisabled = () => {
  return (
    <div className="m5">
      <RadioGroup disabled options={options} placeholder="All disabled" />
    </div>
  );
};

export const WithEvents = () => (
  <div className="m5">
    <RadioGroup
      options={options}
      placeholder="Events (console)"
      onChange={newValue => console.log('onChange', newValue)}
      onClick={() => console.log('onClick')}
      onKeyPress={() => console.log('onKeyPress')}
      onEnter={() => console.log('onEnter')}
      onBlur={() => console.log('onBlur')}
      onFocus={() => console.log('onFocus')}
    />
  </div>
);
