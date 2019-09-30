/* eslint no-console: "off" */
import React from 'react';

import Row from '../../components/Row';
import Column from '../../components/Column';
import ControlIcon from '../../components/ControlIcon';

const rowStyle = { padding: '10px', border: '1px solid #ccc' };
const C = props => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <ControlIcon {...props} />
    {props.label}
  </div>
);
const { log } = console;

const TestControlIcon = () => (
  <Column style={{ padding: '10px' }}>
    Sizes
    <Row style={rowStyle} align="space-between center">
      <C onClick={log} size={10} label="size 10" tooltip="size 10" icon="plus-small" />
      <C onClick={log} size={14} label="size 14" tooltip="size 14" icon="plus-small" />
      <C onClick={log} size={16} label="size 16" tooltip="size 16" icon="plus-small" />
      <C onClick={log} size={18} label="size 18" tooltip="size 18" icon="plus-small" />
      <C onClick={log} size={20} label="size 20" tooltip="size 20" icon="plus-small" />
      <C onClick={log} size={24} label="size 24" tooltip="size 24" icon="plus-small" />
      <C onClick={log} size={30} label="size 30" tooltip="size 30" icon="plus-small" />
    </Row>
    All kinds regular
    <Row style={rowStyle} align="space-between center">
      <C onClick={log} label="default" tooltip="default" icon="plus-small" />
      <C onClick={log} label="primary" kind="primary" tooltip="primary" icon="plus-small" />
      <C onClick={log} label="secondary" kind="secondary" tooltip="secondary" icon="plus-small" />
      <C onClick={log} label="tertiary" kind="tertiary" tooltip="tertiary" icon="plus-small" />
      <C onClick={log} label="success" kind="success" tooltip="success" icon="plus-small" />
      <C onClick={log} label="danger" kind="danger" tooltip="danger" icon="plus-small" />
      <C onClick={log} label="warning" kind="warning" tooltip="warning" icon="plus-small" />
      <C onClick={log} label="dark" kind="dark" tooltip="dark" icon="plus-small" />
      <C onClick={log} label="light" kind="light" tooltip="light" icon="plus-small" />
    </Row>
    Manual settings
    <Row style={rowStyle} align="space-between center">
      <C onClick={log} color="#f33" tooltip="Manual Color" icon="plus-small" />
      <C
        onClick={log}
        className="control-icon__test"
        tooltip="Manual Classname"
        icon="plus-small"
      />
      <C
        onClick={log}
        className="control-icon__test"
        tooltip="short delay (10)"
        icon="plus-small"
        delay={10}
      />
      <C
        onClick={log}
        className="control-icon__test"
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
      <C
        onClick={log}
        tooltip="disabled primary"
        disabled
        kind="primary"
        label="Primary"
        icon="plus-small"
      />
      <C
        onClick={log}
        tooltip="disabled secondary"
        disabled
        kind="secondary"
        label="Secondary"
        icon="plus-small"
      />
      <C
        onClick={log}
        tooltip="disabled tertiary"
        disabled
        kind="tertiary"
        label="Tertiary"
        icon="plus-small"
      />
      <C
        onClick={log}
        tooltip="disabled success"
        disabled
        kind="success"
        label="Success"
        icon="plus-small"
      />
      <C
        onClick={log}
        tooltip="disabled danger"
        disabled
        kind="danger"
        label="Danger"
        icon="plus-small"
      />
      <C
        onClick={log}
        tooltip="disabled warning"
        disabled
        kind="warning"
        label="Warning"
        icon="plus-small"
      />
      <C
        onClick={log}
        tooltip="disabled dark"
        disabled
        kind="dark"
        label="Dark"
        icon="plus-small"
      />
      <C
        onClick={log}
        tooltip="disabled light"
        disabled
        kind="light"
        label="Light"
        icon="plus-small"
      />
    </Row>
    Icon only
    <Row className="p10 b1-ccc" align="space-between center">
      <C kind="primary" tooltip="primary" label="Primary" icon="plus-small" />
      <C kind="secondary" tooltip="secondary" label="Secondary" icon="plus-small" />
      <C kind="tertiary" tooltip="tertiary" label="Tertiary" icon="plus-small" />
      <C kind="success" tooltip="success" label="Success" icon="plus-small" />
      <C kind="danger" tooltip="danger" label="Danger" icon="plus-small" />
      <C kind="warning" tooltip="warning" label="Warning" icon="plus-small" />
      <C kind="dark" tooltip="dark" label="Dark" icon="plus-small" />
      <C kind="light" tooltip="light" label="Light" icon="plus-small" />
    </Row>
  </Column>
);

export default TestControlIcon;
