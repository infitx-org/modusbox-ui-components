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
      <ControlIcon onClick={log} label="no" icon="deploy-small"/>
      <ControlIcon onClick={log} kind="primary" label="Primary" icon="deploy-small"/>
      <ControlIcon onClick={log} kind="secondary" label="Secondary" icon="deploy-small" />
      <ControlIcon onClick={log} kind="tertiary" label="Tertiary" icon="deploy-small" />
      <ControlIcon onClick={log} kind="success" label="Success" icon="deploy-small" />
      <ControlIcon onClick={log} kind="danger" label="Danger" icon="deploy-small" />
      <ControlIcon onClick={log} kind="warning" label="Warning" icon="deploy-small" />
      <ControlIcon onClick={log} kind="dark" label="Dark" icon="deploy-small" />
      <ControlIcon onClick={log} kind="light" label="Light" icon="deploy-small" />
    </Row>
    Manual colors
    <Row style={rowStyle} align="space-between center">
      <ControlIcon onClick={log} color='#f33' label="no" icon="deploy-small"/>
      <ControlIcon onClick={log} color='#f33' kind="primary" label="Primary" icon="deploy-small"/>
      <ControlIcon onClick={log} color='#f33' kind="secondary" label="Secondary" icon="deploy-small" />
      <ControlIcon onClick={log} color='#f33' kind="tertiary" label="Tertiary" icon="deploy-small" />
      <ControlIcon onClick={log} color='#f33' kind="success" label="Success" icon="deploy-small" />
      <ControlIcon onClick={log} color='#f33' kind="danger" label="Danger" icon="deploy-small" />
      <ControlIcon onClick={log} color='#f33' kind="warning" label="Warning" icon="deploy-small" />
      <ControlIcon onClick={log} color='#f33' kind="dark" label="Dark" icon="deploy-small" />
      <ControlIcon onClick={log} color='#f33' kind="light" label="Light" icon="deploy-small" />
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

  </Column>
);

export default TestControlIcon;
