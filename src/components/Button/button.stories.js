/* eslint no-console: "off" */
import React from 'react';

import Row from '../Row';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
};

export const defaultButton = () => <Button label="Primary" kind="primary" onClick={console.log} />;

export const AllKinds = () => (
  <Row align="space-between center">
    <Button label="Primary" kind="primary" />
    <Button label="Secondary" kind="secondary" />
    <Button label="Tertiary" kind="tertiary" />
    <Button label="Success" kind="success" />
    <Button label="Danger" kind="danger" />
    <Button label="Warning" kind="warning" />
    <Button label="Dark" kind="dark" />
    <Button label="Light" kind="light" />
  </Row>
);

export const AllKindsWithNoFill = () => (
  <Row align="space-between center" className="p10 bg-dark">
    <Button noFill label="Primary" kind="primary" />
    <Button noFill label="Secondary" kind="secondary" />
    <Button noFill label="Tertiary" kind="tertiary" />
    <Button noFill label="Success" kind="success" />
    <Button noFill label="Danger" kind="danger" />
    <Button noFill label="Warning" kind="warning" />
    <Button noFill label="Dark" kind="dark" />
    <Button noFill label="Light" kind="light" />
  </Row>
);

export const AllKindsWithIcon = () => (
  <Row align="space-between center">
    <Button icon="deploy-small" label="Primary" kind="primary" />
    <Button icon="deploy-small" label="Secondary" kind="secondary" />
    <Button icon="deploy-small" label="Tertiary" kind="tertiary" />
    <Button icon="deploy-small" label="Success" kind="success" />
    <Button icon="deploy-small" label="Danger" kind="danger" />
    <Button icon="deploy-small" label="Warning" kind="warning" />
    <Button icon="deploy-small" label="Dark" kind="dark" />
    <Button icon="deploy-small" label="Light" kind="light" />
  </Row>
);

export const AllKindsWithNoFillWithIcon = () => (
  <Row align="space-between center" className="p10 bg-dark">
    <Button noFill icon="deploy-small" label="Primary" kind="primary" />
    <Button noFill icon="deploy-small" label="Secondary" kind="secondary" />
    <Button noFill icon="deploy-small" label="Tertiary" kind="tertiary" />
    <Button noFill icon="deploy-small" label="Success" kind="success" />
    <Button noFill icon="deploy-small" label="Danger" kind="danger" />
    <Button noFill icon="deploy-small" label="Warning" kind="warning" />
    <Button noFill icon="deploy-small" label="Dark" kind="dark" />
    <Button noFill icon="deploy-small" label="Light" kind="light" />
  </Row>
);

export const AllPending = () => (
  <Row align="space-between center">
    <Button label="Primary" kind="primary" pending />
    <Button label="Secondary" kind="secondary" pending />
    <Button label="Tertiary" kind="tertiary" pending />
    <Button label="Success" kind="success" pending />
    <Button label="Danger" kind="danger" pending />
    <Button label="Warning" kind="warning" pending />
    <Button label="Dark" kind="dark" pending />
    <Button label="Light" kind="light" pending />
    <Button label="Disabled" disabled pending />
    <Button label="Icon" icon="deploy-small" pending />
  </Row>
);

export const AllPendingWithNoFill = () => (
  <Row align="space-between center">
    <Button noFill label="Primary" kind="primary" pending />
    <Button noFill label="Secondary" kind="secondary" pending />
    <Button noFill label="Tertiary" kind="tertiary" pending />
    <Button noFill label="Success" kind="success" pending />
    <Button noFill label="Danger" kind="danger" pending />
    <Button noFill label="Warning" kind="warning" pending />
    <Button noFill label="Dark" kind="dark" pending />
    <Button noFill label="Light" kind="light" pending />
    <Button noFill label="Disabled" disabled pending />
    <Button noFill label="Icon" icon="deploy-small" pending />
  </Row>
);

export const AllDisabled = () => (
  <Row align="space-between center">
    <Button label="Primary" kind="primary" disabled />
    <Button label="Secondary" kind="secondary" disabled />
    <Button label="Tertiary" kind="tertiary" disabled />
    <Button label="Success" kind="success" disabled />
    <Button label="Danger" kind="danger" disabled />
    <Button label="Warning" kind="warning" disabled />
    <Button label="Dark" kind="dark" disabled />
    <Button label="Pending" pending disabled />
    <Button label="Icon" icon="deploy-small" disabled />
    <Button label="No Fill" icon="deploy-small" noFill disabled />
    <Button label="No Fill" icon="deploy-small" noFill kind="secondary" disabled />
    <Button label="No Fill" icon="deploy-small" noFill kind="tertiary" disabled />
    <Button label="No Fill" icon="deploy-small" noFill kind="danger" disabled />
  </Row>
);

export const AllSizes = () => (
  <div>
    <Row align="space-between center">
      <Button label="Large size " size="l" />
      <Button label="Medium size " size="m" />
      <Button label="Small size " size="s" />
      <Button label="Large size and icon" icon="deploy-small" size="l" />
      <Button label="Medium size and icon" icon="deploy-small" size="m" />
      <Button label="Small size and icon" icon="deploy-small" size="s" />
    </Row>
    <Row align="space-between center">
      <Button label="Large size pending " pending size="l" />
      <Button label="Medium size pending " pending size="m" />
      <Button label="Small size pending " pending size="s" />
    </Row>
  </div>
);

export const WithTooltip = () => (
  <Row align="space-between center">
    <Button label="Test Button Tooltip" tooltip="Test!" />
  </Row>
);
