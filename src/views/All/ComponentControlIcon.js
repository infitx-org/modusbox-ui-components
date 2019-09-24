/* eslint no-console: "off" */
import React from 'react';

import Row from '../../components/Row';
import Column from '../../components/Column';
import ControlIcon from '../../components/ControlIcon';

const rowStyle = { padding: '10px', border: '1px solid #ccc' };
const C = ControlIcon;
const { log } = console;

const TestControlIcon = () => (
  <Column style={{ padding: '10px' }}>
    All kinds regular
    <Row style={rowStyle} align="space-between center">
      <C onClick={log} tooltip="default" icon="plus-small" />
      <C onClick={log} kind="primary" tooltip="primary" icon="plus-small" />
      <C onClick={log} kind="secondary" tooltip="secondary" icon="plus-small" />
      <C onClick={log} kind="tertiary" tooltip="tertiary" icon="plus-small" />
      <C onClick={log} kind="success" tooltip="success" icon="plus-small" />
      <C onClick={log} kind="danger" tooltip="danger" icon="plus-small" />
      <C onClick={log} kind="warning" tooltip="warning" icon="plus-small" />
      <C onClick={log} kind="dark" tooltip="dark" icon="plus-small" />
      <C onClick={log} kind="light" tooltip="light" icon="plus-small" />
    </Row>
    Manual settings
    <Row style={rowStyle} align="space-between center">
      <C onClick={log} color='#f33' tooltip="Manual Color" icon="plus-small" />
      <C
        onClick={log}
        className='control-icon__test'
        tooltip="Manual Classname"
        icon="plus-small"
      />
      <C
        onClick={log}
        className='control-icon__test'
        tooltip="short delay (10)"
        icon="plus-small"
        delay={10}
      />
      <C
        onClick={log}
        className='control-icon__test'
        tooltip="long delay (1000)"
        icon="plus-small"
        delay={1000}
      />

      <C onClick={log} size={20} kind="primary" tooltip="size 20" icon="plus-small" />
      <C onClick={log} size={24} kind="secondary" tooltip="size 24" icon="plus-small" />
      <C onClick={log} size={30} kind="tertiary" tooltip="size 30" icon="plus-small" />
    </Row>
    Disabled
    <Row className="p10 b1-ccc" align="space-between center">
      <C onClick={log} disabled kind="Primary" label="Primary" icon="plus-small" />
      <C onClick={log} disabled kind="Secondary" label="Secondary" icon="plus-small" />
      <C onClick={log} disabled kind="Tertiary" label="Tertiary" icon="plus-small" />
      <C onClick={log} disabled kind="Success" label="Success" icon="plus-small" />
      <C onClick={log} disabled kind="Danger" label="Danger" icon="plus-small" />
      <C onClick={log} disabled kind="Warning" label="Warning" icon="plus-small" />
      <C onClick={log} disabled kind="Dark" label="Dark" icon="plus-small" />
      <C onClick={log} disabled kind="Light" label="Light" icon="plus-small" />
    </Row>

  </Column>
);

export default TestControlIcon;
