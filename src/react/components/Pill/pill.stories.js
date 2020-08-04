import React from 'react';

import Row from '../Row';
import Pill from './Pill';

export default {
  title: 'Pill',
  component: Pill,
};

export const Default = () => (
  <Row align="left">
    <div className="m5">
      <Pill label="this is the default pill" kind="default" />
    </div>
  </Row>
);

export const AllKindsRegular = () => (
  <Row align="left">
    <div className="m5">
      <Pill label="Default" kind="default" />
    </div>
    <div className="m5">
      <Pill label="Primary" kind="primary" />
    </div>
    <div className="m5">
      <Pill label="Secondary" kind="secondary" />
    </div>
    <div className="m5">
      <Pill label="Tertiary" kind="tertiary" />
    </div>
    <div className="m5">
      <Pill label="Success" kind="success" />
    </div>
    <div className="m5">
      <Pill label="Danger" kind="danger" />
    </div>
    <div className="m5">
      <Pill label="Warning" kind="warning" />
    </div>
    <div className="m5">
      <Pill label="Dark" kind="dark" />
    </div>
    <div className="m5">
      <Pill label="Light" kind="light" />
    </div>
  </Row>
);

export const AllKindsWithIcon = () => (
  <Row align="left">
    <div className="m5">
      <Pill icon="deploy-small" label="Default" kind="default" />
    </div>
    <div className="m5">
      <Pill icon="deploy-small" label="Primary" kind="primary" />
    </div>
    <div className="m5">
      <Pill icon="deploy-small" label="Secondary" kind="secondary" />
    </div>
    <div className="m5">
      <Pill icon="deploy-small" label="Tertiary" kind="tertiary" />
    </div>
    <div className="m5">
      <Pill icon="deploy-small" label="Success" kind="success" />
    </div>
    <div className="m5">
      <Pill icon="deploy-small" label="Danger" kind="danger" />
    </div>
    <div className="m5">
      <Pill icon="deploy-small" label="Warning" kind="warning" />
    </div>
    <div className="m5">
      <Pill icon="deploy-small" label="Dark" kind="dark" />
    </div>
    <div className="m5">
      <Pill icon="deploy-small" label="Light" kind="light" />
    </div>
  </Row>
);

export const AllKindsActiveIcon = () => (
  <Row align="left">
    <div className="m5">
      <Pill active icon="deploy-small" label="Default" kind="default" />
    </div>
    <div className="m5">
      <Pill active icon="deploy-small" label="Primary" kind="primary" />
    </div>
    <div className="m5">
      <Pill active icon="deploy-small" label="Secondary" kind="secondary" />
    </div>
    <div className="m5">
      <Pill active icon="deploy-small" label="Tertiary" kind="tertiary" />
    </div>
    <div className="m5">
      <Pill active icon="deploy-small" label="Success" kind="success" />
    </div>
    <div className="m5">
      <Pill active icon="deploy-small" label="Danger" kind="danger" />
    </div>
    <div className="m5">
      <Pill active icon="deploy-small" label="Warning" kind="warning" />
    </div>
    <div className="m5">
      <Pill active icon="deploy-small" label="Dark" kind="dark" />
    </div>
    <div className="m5">
      <Pill active icon="deploy-small" label="Light" kind="light" />
    </div>
  </Row>
);

export const FillIcon = () => (
  <Row align="left">
    <div className="m5">
      <Pill label="Filling the icon" icon="deploy-small" fill="#f00" />
    </div>
  </Row>
);
