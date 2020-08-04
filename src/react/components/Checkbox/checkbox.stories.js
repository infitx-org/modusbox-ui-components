/* eslint no-alert: "off" */
/* eslint no-console: "off" */
/* eslint no-console: "off" */
import React from 'react';

import Column from '../Column';
import Checkbox from './Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

export const Default = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox label="Default Checkbox" checked={false} />
    </div>
    <div className="m5">
      <Checkbox label="Default Checkbox" checked />
    </div>
  </Column>
);

export const SemiChecked = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox label="Semi Checked Checkbox" checked={false} semi />
    </div>
    <div className="m5">
      <Checkbox label="Semi Checked Checkbox" checked semi />
    </div>
  </Column>
);

export const Round = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox label="Round Checkbox" checked={false} round />
    </div>
    <div className="m5">
      <Checkbox label="Round Checkbox" checked round />
    </div>
  </Column>
);

export const Disabled = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox label="Disabled Checkbox" checked={false} disabled />
    </div>
    <div className="m5">
      <Checkbox label="Disabled Checkbox" checked disabled />
    </div>
  </Column>
);

export const OnChange = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox label="onChange event Checkbox" checked={false} onChange={console.log} />
    </div>
    <div className="m5">
      <Checkbox label="onChange event Checkbox" checked onChange={console.log} />
    </div>
  </Column>
);

export const OnFocus = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox label="onFocus event Checkbox" checked={false} onFocus={console.log} />
    </div>
    <div className="m5">
      <Checkbox label="onFocus event Checkbox" checked onFocus={console.log} />
    </div>
  </Column>
);

export const OnBlur = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox label="onBlur event Checkbox" checked={false} onBlur={console.log} />
    </div>
    <div className="m5">
      <Checkbox label="onBlur event Checkbox" checked onBlur={console.log} />
    </div>
  </Column>
);
