/* eslint no-console: "off" */
import React from 'react';
import Row from '../Row';
import Column from '../Column';
import Dropdown from './Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
};

const Content = () => (
  <Column style={{ width: '200px' }}>
    <Row>This is the header</Row>
    <Row>This is the content</Row>
  </Column>
);

export const AllKinds = () => (
  <Row align="space-between center">
    <Dropdown label="Primary" kind="primary">
      <Content />
    </Dropdown>
    <Dropdown label="Secondary" kind="secondary">
      <Content />
    </Dropdown>
    <Dropdown label="Tertiary" kind="tertiary">
      <Content />
    </Dropdown>
    <Dropdown label="Success" kind="success">
      <Content />
    </Dropdown>
    <Dropdown label="Danger" kind="danger">
      <Content />
    </Dropdown>
    <Dropdown label="Warning" kind="warning">
      <Content />
    </Dropdown>
    <Dropdown label="Dark" kind="dark">
      <Content />
    </Dropdown>
    <Dropdown label="Light" kind="light">
      <Content />
    </Dropdown>
  </Row>
);

export const AllKindsWithNoFill = () => (
  <Row align="space-between center" className="p10 bg-dark">
    <Dropdown noFill label="Primary" kind="primary">
      <Content />
    </Dropdown>
    <Dropdown noFill label="Secondary" kind="secondary">
      <Content />
    </Dropdown>
    <Dropdown noFill label="Tertiary" kind="tertiary">
      <Content />
    </Dropdown>
    <Dropdown noFill label="Success" kind="success">
      <Content />
    </Dropdown>
    <Dropdown noFill label="Danger" kind="danger">
      <Content />
    </Dropdown>
    <Dropdown noFill label="Warning" kind="warning">
      <Content />
    </Dropdown>
    <Dropdown noFill label="Dark" kind="dark">
      <Content />
    </Dropdown>
    <Dropdown noFill label="Light" kind="light">
      <Content />
    </Dropdown>
  </Row>
);

export const AllKindsWithIcon = () => (
  <Row align="space-between center">
    <Dropdown icon="deploy-small" label="Primary" kind="primary">
      <Content />
    </Dropdown>
    <Dropdown icon="deploy-small" label="Secondary" kind="secondary">
      <Content />
    </Dropdown>
    <Dropdown icon="deploy-small" label="Tertiary" kind="tertiary">
      <Content />
    </Dropdown>
    <Dropdown icon="deploy-small" label="Success" kind="success">
      <Content />
    </Dropdown>
    <Dropdown icon="deploy-small" label="Danger" kind="danger">
      <Content />
    </Dropdown>
    <Dropdown icon="deploy-small" label="Warning" kind="warning">
      <Content />
    </Dropdown>
    <Dropdown icon="deploy-small" label="Dark" kind="dark">
      <Content />
    </Dropdown>
    <Dropdown icon="deploy-small" label="Light" kind="light">
      <Content />
    </Dropdown>
  </Row>
);

export const AllKindsWithNoFillWithIcon = () => (
  <Row align="space-between center" className="p10 bg-dark">
    <Dropdown noFill icon="deploy-small" label="Primary" kind="primary">
      <Content />
    </Dropdown>
    <Dropdown noFill icon="deploy-small" label="Secondary" kind="secondary">
      <Content />
    </Dropdown>
    <Dropdown noFill icon="deploy-small" label="Tertiary" kind="tertiary">
      <Content />
    </Dropdown>
    <Dropdown noFill icon="deploy-small" label="Success" kind="success">
      <Content />
    </Dropdown>
    <Dropdown noFill icon="deploy-small" label="Danger" kind="danger">
      <Content />
    </Dropdown>
    <Dropdown noFill icon="deploy-small" label="Warning" kind="warning">
      <Content />
    </Dropdown>
    <Dropdown noFill icon="deploy-small" label="Dark" kind="dark">
      <Content />
    </Dropdown>
    <Dropdown noFill icon="deploy-small" label="Light" kind="light">
      <Content />
    </Dropdown>
  </Row>
);

export const AllPending = () => (
  <Row align="space-between center">
    <Dropdown label="Primary" kind="primary" pending>
      <Content />
    </Dropdown>
    <Dropdown label="Secondary" kind="secondary" pending>
      <Content />
    </Dropdown>
    <Dropdown label="Tertiary" kind="tertiary" pending>
      <Content />
    </Dropdown>
    <Dropdown label="Success" kind="success" pending>
      <Content />
    </Dropdown>
    <Dropdown label="Danger" kind="danger" pending>
      <Content />
    </Dropdown>
    <Dropdown label="Warning" kind="warning" pending>
      <Content />
    </Dropdown>
    <Dropdown label="Dark" kind="dark" pending>
      <Content />
    </Dropdown>
    <Dropdown label="Light" kind="light" pending>
      <Content />
    </Dropdown>
    <Dropdown label="Disabled" disabled pending>
      <Content />
    </Dropdown>
    <Dropdown label="Icon" icon="deploy-small" pending>
      <Content />
    </Dropdown>
  </Row>
);

export const AllPendingWithNoFill = () => (
  <Row align="space-between center">
    <Dropdown noFill label="Primary" kind="primary" pending>
      <Content />
    </Dropdown>
    <Dropdown noFill label="Secondary" kind="secondary" pending>
      <Content />
    </Dropdown>
    <Dropdown noFill label="Tertiary" kind="tertiary" pending>
      <Content />
    </Dropdown>
    <Dropdown noFill label="Success" kind="success" pending>
      <Content />
    </Dropdown>
    <Dropdown noFill label="Danger" kind="danger" pending>
      <Content />
    </Dropdown>
    <Dropdown noFill label="Warning" kind="warning" pending>
      <Content />
    </Dropdown>
    <Dropdown noFill label="Dark" kind="dark" pending>
      <Content />
    </Dropdown>
    <Dropdown noFill label="Light" kind="light" pending>
      <Content />
    </Dropdown>
    <Dropdown noFill label="Disabled" disabled pending>
      <Content />
    </Dropdown>
    <Dropdown noFill label="Icon" icon="deploy-small" pending>
      <Content />
    </Dropdown>
  </Row>
);

export const AllDisabled = () => (
  <Row align="space-between center">
    <Dropdown label="Primary" kind="primary" disabled>
      <Content />
    </Dropdown>
    <Dropdown label="Secondary" kind="secondary" disabled>
      <Content />
    </Dropdown>
    <Dropdown label="Tertiary" kind="tertiary" disabled>
      <Content />
    </Dropdown>
    <Dropdown label="Success" kind="success" disabled>
      <Content />
    </Dropdown>
    <Dropdown label="Danger" kind="danger" disabled>
      <Content />
    </Dropdown>
    <Dropdown label="Warning" kind="warning" disabled>
      <Content />
    </Dropdown>
    <Dropdown label="Dark" kind="dark" disabled>
      <Content />
    </Dropdown>
    <Dropdown label="Pending" pending disabled>
      <Content />
    </Dropdown>
    <Dropdown label="Icon" icon="deploy-small" disabled>
      <Content />
    </Dropdown>
    <Dropdown label="No Fill" icon="deploy-small" noFill disabled>
      <Content />
    </Dropdown>
    <Dropdown label="No Fill" icon="deploy-small" noFill kind="secondary" disabled>
      <Content />
    </Dropdown>
    <Dropdown label="No Fill" icon="deploy-small" noFill kind="tertiary" disabled>
      <Content />
    </Dropdown>
    <Dropdown label="No Fill" icon="deploy-small" noFill kind="danger" disabled>
      <Content />
    </Dropdown>
  </Row>
);

export const AllSizes = () => (
  <div>
    <Row align="space-between center">
      <Dropdown label="Large size " size="l">
        <Content />
      </Dropdown>
      <Dropdown label="Medium size " size="m">
        <Content />
      </Dropdown>
      <Dropdown label="Small size " size="s">
        <Content />
      </Dropdown>
      <Dropdown label="Large size and icon" icon="deploy-small" size="l">
        <Content />
      </Dropdown>
      <Dropdown label="Medium size and icon" icon="deploy-small" size="m">
        <Content />
      </Dropdown>
      <Dropdown label="Small size and icon" icon="deploy-small" size="s">
        <Content />
      </Dropdown>
    </Row>
    <Row align="space-between center">
      <Dropdown label="Large size pending " pending size="l">
        <Content />
      </Dropdown>
      <Dropdown label="Medium size pending " pending size="m">
        <Content />
      </Dropdown>
      <Dropdown label="Small size pending " pending size="s">
        <Content />
      </Dropdown>
    </Row>
  </div>
);

export const WithTooltip = () => (
  <Row align="space-between center">
    <Dropdown label="Test Dropdown Tooltip" tooltip="Test!">
      <Content />
    </Dropdown>
  </Row>
);
