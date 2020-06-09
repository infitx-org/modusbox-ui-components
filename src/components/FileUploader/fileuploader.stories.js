/* eslint no-console: "off" */
import React, { useState } from 'react';

import FileUploader from './FileUploader';
import { createOptionalValidation, validate, vd } from '../../reduxValidation';

export default {
  title: 'FileUploader',
  component: FileUploader,
};

export const Default = () => (
  <div className="m5">
    <FileUploader placeholder="Default" />
  </div>
);

export const WithPending = () => (
  <div className="m5">
    <FileUploader pending placeholder="Pending" />
  </div>
);

export const WithInvalid = () => (
  <div className="m5">
    <FileUploader invalid placeholder="Invalid" />
  </div>
);

export const WithValidation = () => {
  const [value, setValue] = useState(undefined);
  const validators = createOptionalValidation([vd.isEmail, vd.maxLength(10), vd.isNum, vd.isText]);
  const validationResult = validate(value, validators);
  return (
    <div className="m5">
      <FileUploader
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
    <FileUploader required placeholder="Required" />
  </div>
);

export const WithDisabled = () => (
  <div className="m5">
    <FileUploader disabled placeholder="Disabled" />
  </div>
);

export const WithIcon = () => (
  <div className="m5">
    <FileUploader icon="close-small" placeholder="Icon" />
  </div>
);

export const WithDisable = () => (
  <div className="m5">
    <FileUploader placeholder="Required Disabled" required disabled />
  </div>
);

export const WithRequiredDisabledInval = () => (
  <div className="m5">
    <FileUploader required disabled invalid placeholder="RequiredDisabledInvalid" />
  </div>
);

export const WithSmall = () => (
  <div className="m5">
    <FileUploader size="s" placeholder="Small" />
  </div>
);

export const WithMedium = () => (
  <div className="m5">
    <FileUploader size="m" placeholder="Medium" />
  </div>
);

export const WithLarge = () => (
  <div className="m5">
    <FileUploader size="l" placeholder="Large" />
  </div>
);

export const WithSmallPending = () => (
  <div className="m5">
    <FileUploader size="s" pending placeholder="Small" />
  </div>
);

export const WithMediumPending = () => (
  <div className="m5">
    <FileUploader size="m" pending placeholder="Medium" />
  </div>
);

export const WithLargePending = () => (
  <div className="m5">
    <FileUploader size="l" pending placeholder="Large" />
  </div>
);

export const WithEvents = () => (
  <div className="m5">
    <FileUploader
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
