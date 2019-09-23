/* eslint no-console: "off" */
import React from 'react';

import Row from '../../components/Row';
import Column from '../../components/Column';
import ControlIcon from '../../components/ControlIcon';

const rowStyle = { padding: '10px', border: '1px solid #ccc' };
const { log } = console;

const TestControlIcon = () => (
  <Column style={{ padding: '10px' }}>
    All kinds regular
    <Row style={rowStyle} align="space-between center">
      <ControlIcon onClick={log} kind="Primary" label="Primary" icon="deploy-small" />
      <ControlIcon onClick={log} kind="Secondary" label="Secondary" icon="deploy-small" />
      <ControlIcon onClick={log} kind="Tertiary" label="Tertiary" icon="deploy-small" />
      <ControlIcon onClick={log} kind="Success" label="Success" icon="deploy-small" />
      <ControlIcon onClick={log} kind="Danger" label="Danger" icon="deploy-small" />
      <ControlIcon onClick={log} kind="Warning" label="Warning" icon="deploy-small" />
      <ControlIcon onClick={log} kind="Dark" label="Dark" icon="deploy-small" />
      <ControlIcon onClick={log} kind="Light" label="Light" icon="deploy-small" />
    </Row>
    Disabled
    <Row className="p10 b1-ccc" align="space-between center">
      <ControlIcon onClick={log} disabled kind="Primary" label="Primary" icon="deploy-small" />
      <ControlIcon onClick={log} disabled kind="Secondary" label="Secondary" icon="deploy-small" />
      <ControlIcon onClick={log} disabled kind="Tertiary" label="Tertiary" icon="deploy-small" />
      <ControlIcon onClick={log} disabled kind="Success" label="Success" icon="deploy-small" />
      <ControlIcon onClick={log} disabled kind="Danger" label="Danger" icon="deploy-small" />
      <ControlIcon onClick={log} disabled kind="Warning" label="Warning" icon="deploy-small" />
      <ControlIcon onClick={log} disabled kind="Dark" label="Dark" icon="deploy-small" />
      <ControlIcon onClick={log} disabled kind="Light" label="Light" icon="deploy-small" />
    </Row>
    Sizes
    <Row className="p10 b1-ccc" align="space-between center">
      <ControlIcon onClick={log} label="Large size and icon" icon="deploy-small" size="l" />
      <ControlIcon onClick={log} label="Medium size and icon" icon="deploy-small" size="m" />
      <ControlIcon onClick={log} label="Small size and icon" icon="deploy-small" size="s" />
      <ControlIcon onClick={log} label="Large size pending" icon="deploy-small" pending size="l" />
      <ControlIcon onClick={log} label="Medium size pending" icon="deploy-small" pending size="m" />
      <ControlIcon onClick={log} label="Small size pending" icon="deploy-small" pending size="s" />
    </Row>

  </Column>
);

export default TestControlIcon;
