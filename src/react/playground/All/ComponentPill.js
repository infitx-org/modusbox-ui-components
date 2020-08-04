import React from 'react';

import Pill from '../../components/Pill';
import Row from '../../components/Row';

const Wrapped = props => (
  <div className="m5">
    <Pill {...props} />
  </div>
);

const TestMessageBox = () => (
  <div style={{ padding: 10 }}>
    All kinds regular
    <Row align="left">
      <Wrapped label="Default" kind="default" />
      <Wrapped label="Primary" kind="primary" />
      <Wrapped label="Secondary" kind="secondary" />
      <Wrapped label="Tertiary" kind="tertiary" />
      <Wrapped label="Success" kind="success" />
      <Wrapped label="Danger" kind="danger" />
      <Wrapped label="Warning" kind="warning" />
      <Wrapped label="Dark" kind="dark" />
      <Wrapped label="Light" kind="light" />
    </Row>
    All kinds with icon
    <Row align="left">
      <Wrapped icon="deploy-small" label="Default" kind="default" />
      <Wrapped icon="deploy-small" label="Primary" kind="primary" />
      <Wrapped icon="deploy-small" label="Secondary" kind="secondary" />
      <Wrapped icon="deploy-small" label="Tertiary" kind="tertiary" />
      <Wrapped icon="deploy-small" label="Success" kind="success" />
      <Wrapped icon="deploy-small" label="Danger" kind="danger" />
      <Wrapped icon="deploy-small" label="Warning" kind="warning" />
      <Wrapped icon="deploy-small" label="Dark" kind="dark" />
      <Wrapped icon="deploy-small" label="Light" kind="light" />
    </Row>
    All kinds with icon, active
    <Row align="left">
      <Wrapped active icon="deploy-small" label="Default" kind="default" />
      <Wrapped active icon="deploy-small" label="Primary" kind="primary" />
      <Wrapped active icon="deploy-small" label="Secondary" kind="secondary" />
      <Wrapped active icon="deploy-small" label="Tertiary" kind="tertiary" />
      <Wrapped active icon="deploy-small" label="Success" kind="success" />
      <Wrapped active icon="deploy-small" label="Danger" kind="danger" />
      <Wrapped active icon="deploy-small" label="Warning" kind="warning" />
      <Wrapped active icon="deploy-small" label="Dark" kind="dark" />
      <Wrapped active icon="deploy-small" label="Light" kind="light" />
    </Row>
    All kinds tooltip
    <Row align="left">
      <Wrapped
        active
        tooltip="Hello default Pill"
        icon="deploy-small"
        label="Default"
        kind="default"
      />
      <Wrapped
        active
        tooltip="Hello primary Pill"
        icon="deploy-small"
        label="Primary"
        kind="primary"
      />
      <Wrapped
        active
        tooltip="Hello secondary Pill"
        icon="deploy-small"
        label="Secondary"
        kind="secondary"
      />
      <Wrapped
        active
        tooltip="Hello tertiary Pill"
        icon="deploy-small"
        label="Tertiary"
        kind="tertiary"
      />
      <Wrapped
        active
        tooltip="Hello success Pill"
        icon="deploy-small"
        label="Success"
        kind="success"
      />
      <Wrapped
        active
        tooltip="Hello danger Pill"
        icon="deploy-small"
        label="Danger"
        kind="danger"
      />
      <Wrapped
        active
        tooltip="Hello warning Pill"
        icon="deploy-small"
        label="Warning"
        kind="warning"
      />
      <Wrapped active tooltip="Hello dark Pill" icon="deploy-small" label="Dark" kind="dark" />
      <Wrapped active tooltip="Hello light Pill" icon="deploy-small" label="Light" kind="light" />
    </Row>
    Override fill
    <Row align="left">
      <Wrapped
        fill="#333"
        active
        tooltip="Hello default Pill"
        icon="deploy-small"
        label="Default"
        kind="default"
      />
      <Wrapped
        fill="#333"
        active
        tooltip="Hello primary Pill"
        icon="deploy-small"
        label="Primary"
        kind="primary"
      />
      <Wrapped
        fill="#333"
        active
        tooltip="Hello secondary Pill"
        icon="deploy-small"
        label="Secondary"
        kind="secondary"
      />
      <Wrapped
        fill="#333"
        active
        tooltip="Hello tertiary Pill"
        icon="deploy-small"
        label="Tertiary"
        kind="tertiary"
      />
      <Wrapped
        fill="#333"
        active
        tooltip="Hello success Pill"
        icon="deploy-small"
        label="Success"
        kind="success"
      />
      <Wrapped
        fill="#333"
        active
        tooltip="Hello danger Pill"
        icon="deploy-small"
        label="Danger"
        kind="danger"
      />
      <Wrapped
        fill="#333"
        active
        tooltip="Hello warning Pill"
        icon="deploy-small"
        label="Warning"
        kind="warning"
      />
      <Wrapped
        fill="#333"
        active
        tooltip="Hello dark Pill"
        icon="deploy-small"
        label="Dark"
        kind="dark"
      />
      <Wrapped
        fill="#333"
        active
        tooltip="Hello light Pill"
        icon="deploy-small"
        label="Light"
        kind="light"
      />
    </Row>
    <Row align="left" wrap>
      {new Array(100).fill(0).map((_, i) => (
        <Wrapped label={i.toString()} kind="default" />
      ))}
    </Row>
  </div>
);

export default TestMessageBox;
