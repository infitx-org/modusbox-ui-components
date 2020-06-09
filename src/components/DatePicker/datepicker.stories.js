/* eslint no-console: "off" */
import React, { useState } from 'react';

import DatePicker from './DatePicker';
import { createOptionalValidation, createValidator, validate, vd } from '../../reduxValidation';

export default {
  title: 'DatePicker',
  component: DatePicker,
};

export const Default = () => (
  <div className="m5">
    <DatePicker placeholder="Default" value={Date.now()} />
  </div>
);

export const DefaultWithTime = () => (
  <div className="m5">
    <DatePicker placeholder="Default" withTimevalue={Date.now()} />
  </div>
);

export const WithPending = () => (
  <div className="m5">
    <DatePicker pending placeholder="Pending" value={Date.now()} />
  </div>
);

export const WithInvalid = () => (
  <div className="m5">
    <DatePicker invalid placeholder="Invalid" value={Date.now()} />
  </div>
);

export const WithValidation = () => {
  const [value, setValue] = useState(undefined);
  const isAprilOrSunday = createValidator('It is April or it is a Sunday', date => {
    if (!date) {
      return undefined;
    }
    const dateObj = new Date(date);
    return dateObj.getMonth() === 3 || dateObj.getDay() === 6;
  });
  const validators = createOptionalValidation([isAprilOrSunday]);
  const validationResult = validate(value, validators);
  return (
    <div className="m5">
      <DatePicker
        placeholder="Validation"
        value={value}
        onSelect={setValue}
        invalid={!validationResult.isValid}
        invalidMessages={validationResult.messages}
        value={Date.now()}
      />
    </div>
  );
};

export const WithRequired = () => (
  <div className="m5">
    <DatePicker format="x" required placeholder="Required" value={Date.now()} />
  </div>
);

export const WithDisabled = () => (
  <div className="m5">
    <DatePicker format="x" disabled placeholder="Disabled" value={Date.now()} />
  </div>
);

export const WithDisable = () => (
  <div className="m5">
    <DatePicker format="x" placeholder="Required Disabled" required disabled value={Date.now()} />
  </div>
);

export const WithRequiredDisabledInvalid = () => (
  <div className="m5">
    <DatePicker
      format="x"
      required
      disabled
      invalid
      placeholder="RequiredDisabledInvalid"
      value={Date.now()}
    />
  </div>
);
export const WithExportFormatUTC_ms = () => (
  <div className="m5">
    <DatePicker placeholder="Select a date" format="x" onSelect={console.log} value={Date.now()} />
  </div>
);

export const WithExportFormatUTC_s = () => (
  <div className="m5">
    <DatePicker placeholder="Select a date" format="X" onSelect={console.log} value={Date.now()} />
  </div>
);

export const WithExportFormatDefault = () => (
  <div className="m5">
    <DatePicker placeholder="Select a date" onSelect={console.log} value={Date.now()} />
  </div>
);

export const WithExportFormatCustom = () => (
  <div className="m5">
    <DatePicker
      placeholder="Select a date"
      format="[Day] DD [of Month] MMMM [of Year] YYYY [at time] HH:mm [and] ss [seconds]"
      onSelect={console.log}
      value={Date.now()}
    />
  </div>
);

export const WithDateFormatUTC_ms = () => (
  <div className="m5">
    <DatePicker
      placeholder="Select a date"
      dateFormat="x"
      onSelect={console.log}
      value={Date.now()}
    />
  </div>
);

export const WithDateFormatUTC_s = () => (
  <div className="m5">
    <DatePicker
      placeholder="Select a date"
      dateFormat="X"
      onSelect={console.log}
      value={Date.now()}
    />
  </div>
);

export const WithDateFormatDefault = () => (
  <div className="m5">
    <DatePicker placeholder="Select a date" onSelect={console.log} value={Date.now()} />
  </div>
);

export const WithDateFormatCustom = () => (
  <div className="m5">
    <DatePicker
      placeholder="Select a date"
      dateFormat="[Day] DD [of Month] MMMM [of Year] YYYY [at time] HH:mm [and] ss [seconds]"
      onSelect={console.log}
      withTime
      value={Date.now()}
    />
  </div>
);

export const Small = () => (
  <div className="m5">
    <DatePicker format="x" size="s" placeholder="Small" />
  </div>
);

export const Medium = () => (
  <div className="m5">
    <DatePicker format="x" size="m" placeholder="Medium" />
  </div>
);

export const Large = () => (
  <div className="m5">
    <DatePicker format="x" size="l" placeholder="Large" />
  </div>
);

export const SmallPending = () => (
  <div className="m5">
    <DatePicker format="x" size="s" pending placeholder="Small" />
  </div>
);

export const MediumPending = () => (
  <div className="m5">
    <DatePicker format="x" size="m" pending placeholder="Medium" />
  </div>
);

export const LargePending = () => (
  <div className="m5">
    <DatePicker format="x" size="l" pending placeholder="Large" />
  </div>
);

export const WithEvents = () => (
  <div className="m5">
    <DatePicker
      format="x"
      placeholder="Events (console)"
      onSelect={value => console.log('onSelect', value)}
      onClick={() => console.log('onClick')}
      onKeyPress={() => console.log('onKeyPress')}
      onEnter={() => console.log('onEnter')}
      onBlur={() => console.log('onBlur')}
      onFocus={() => console.log('onFocus')}
    />
  </div>
);
