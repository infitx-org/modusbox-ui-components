/* eslint no-console: "off" */
import { createOptionalValidation, validate, vd } from 'utils/validation';
import React, { useState } from 'react';

import TextField from './TextField';

export default {
  title: 'TextField',
  component: TextField,
};

export const Default = () => (
  <div className="m5">
    <TextField type="text" placeholder="Default" />
  </div>
);

export const TypePassword = () => (
  <div className="m5">
    <TextField type="password" placeholder="Password" />
  </div>
);

export const TypeNumber = () => (
  <div className="m5">
    <TextField type="number" onChange={console.log} value="10" placeholder="Number" />
  </div>
);

export const WithPending = () => (
  <div className="m5">
    <TextField pending placeholder="Pending" />
  </div>
);

export const WithInvalid = () => (
  <div className="m5">
    <TextField invalid placeholder="Invalid" />
  </div>
);

export const WithValidation = () => {
  const [value, setValue] = useState(undefined);
  const validators = createOptionalValidation([vd.isEmail, vd.maxLength(10), vd.isNum, vd.isText]);
  const validationResult = validate(value, validators);
  return (
    <div className="m5">
      <TextField
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
    <TextField required placeholder="Required" />
  </div>
);

export const WithDisabled = () => (
  <div className="m5">
    <TextField disabled placeholder="Disabled" />
  </div>
);

export const WithIcon = () => (
  <div className="m5">
    <TextField icon="close-small" placeholder="Icon" />
  </div>
);

export const WithButton = () => (
  <div className="m5">
    <TextField
      onButtonClick={console.log}
      buttonText="Press Me"
      buttonKind="primary"
      placeholder="Button"
    />
  </div>
);

export const WithPasswordPending = () => (
  <div className="m5">
    <TextField type="password" pending placeholder="PasswordPending" />
  </div>
);

export const WithDisable = () => (
  <div className="m5">
    <TextField placeholder="Required Disabled" required disabled />
  </div>
);

export const WithRequiredDisabledInval = () => (
  <div className="m5">
    <TextField required disabled invalid placeholder="RequiredDisabledInvalid" />
  </div>
);

export const WithSmall = () => (
  <div className="m5">
    <TextField size="s" placeholder="Small" />
  </div>
);

export const WithMedium = () => (
  <div className="m5">
    <TextField size="m" placeholder="Medium" />
  </div>
);

export const WithLarge = () => (
  <div className="m5">
    <TextField size="l" placeholder="Large" />
  </div>
);

export const WithSmallPending = () => (
  <div className="m5">
    <TextField size="s" pending placeholder="Small" />
  </div>
);

export const WithMediumPending = () => (
  <div className="m5">
    <TextField size="m" pending placeholder="Medium" />
  </div>
);

export const WithLargePending = () => (
  <div className="m5">
    <TextField size="l" pending placeholder="Large" />
  </div>
);

export const WithEvents = () => (
  <div className="m5">
    <TextField
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
