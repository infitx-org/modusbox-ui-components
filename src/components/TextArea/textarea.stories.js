/* eslint no-console: "off" */
import React, { useState } from 'react';

import TextArea from './TextArea';
import { createOptionalValidation, validate, vd } from '../../reduxValidation';

export default {
  title: 'TextArea',
  component: TextArea,
};

export const Default = () => (
  <div className="m5">
    <TextArea type="text" placeholder="Default" />
  </div>
);

export const WithPending = () => (
  <div className="m5">
    <TextArea pending placeholder="Pending" />
  </div>
);

export const WithInvalid = () => (
  <div className="m5">
    <TextArea invalid placeholder="Invalid" />
  </div>
);

export const WithValidation = () => {
  const [value, setValue] = useState(undefined);
  const validators = createOptionalValidation([vd.isEmail, vd.maxLength(10), vd.isNum, vd.isText]);
  const validationResult = validate(value, validators);
  return (
    <div className="m5">
      <TextArea
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
    <TextArea required placeholder="Required" />
  </div>
);

export const WithDisabled = () => (
  <div className="m5">
    <TextArea disabled placeholder="Disabled" />
  </div>
);

export const WithIcon = () => (
  <div className="m5">
    <TextArea icon="close-small" placeholder="Icon" />
  </div>
);

export const WithButton = () => (
  <div className="m5">
    <TextArea
      onButtonClick={console.log}
      buttonText="Press Me"
      buttonKind="primary"
      placeholder="Button"
    />
  </div>
);

export const WithPasswordPending = () => (
  <div className="m5">
    <TextArea type="password" pending placeholder="PasswordPending" />
  </div>
);

export const WithDisable = () => (
  <div className="m5">
    <TextArea placeholder="Required Disabled" required disabled />
  </div>
);

export const WithRequiredDisabledInval = () => (
  <div className="m5">
    <TextArea required disabled invalid placeholder="RequiredDisabledInvalid" />
  </div>
);

export const WithSmall = () => (
  <div className="m5">
    <TextArea size="s" placeholder="Small" />
  </div>
);

export const WithMedium = () => (
  <div className="m5">
    <TextArea size="m" placeholder="Medium" />
  </div>
);

export const WithLarge = () => (
  <div className="m5">
    <TextArea size="l" placeholder="Large" />
  </div>
);

export const WithSmallPending = () => (
  <div className="m5">
    <TextArea size="s" pending placeholder="Small" />
  </div>
);

export const WithMediumPending = () => (
  <div className="m5">
    <TextArea size="m" pending placeholder="Medium" />
  </div>
);

export const WithLargePending = () => (
  <div className="m5">
    <TextArea size="l" pending placeholder="Large" />
  </div>
);

export const WithEvents = () => (
  <div className="m5">
    <TextArea
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
