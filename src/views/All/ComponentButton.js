/* eslint no-console: "off" */
import React from 'react';

import Row from '../../components/Row';
import Column from '../../components/Column';
import Button from '../../components/Button';

const rowStyle = { padding: '10px', border: '1px solid #ccc' };

const TestButton = () => (
  <Column style={{ padding: '10px' }}>
    All kinds regular
    <Row style={rowStyle} align="space-between center">
      <Button label="Primary" kind="primary" />
      <Button label="Secondary" kind="secondary" />
      <Button label="Tertiary" kind="tertiary" />
      <Button label="Success" kind="success" />
      <Button label="Danger" kind="danger" />
      <Button label="Warning" kind="warning" />
      <Button label="Dark" kind="dark" />
      <Button label="Light" kind="light" />
      <Button label="Events" onClick={console.log} />
      <Button label="Icon" icon="deploy-small" />
    </Row>
    All kinds noFill
    <Row style={{ ...rowStyle, background: '#333' }} align="space-between center">
      <Button noFill label="Primary" kind="primary" />
      <Button noFill label="Secondary" kind="secondary" />
      <Button noFill label="Tertiary" kind="tertiary" />
      <Button noFill label="Success" kind="success" />
      <Button noFill label="Danger" kind="danger" />
      <Button noFill label="Warning" kind="warning" />
      <Button noFill label="Dark" kind="dark" />
      <Button noFill label="Light" kind="light" />
      <Button noFill label="Events" onClick={console.log} />
      <Button noFill label="Icon" icon="deploy-small" />
    </Row>
    Pending regular
    <Row style={rowStyle} align="space-between center">
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
    Pending noFill
    <Row style={rowStyle} align="space-between center">
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
    Disabled
    <Row className="p10 b1-ccc" align="space-between center">
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
    Sizes
    <Row className="p10 b1-ccc" align="space-between center">
      <Button label="Large size " size="l" />
      <Button label="Medium size " size="m" />
      <Button label="Small size " size="s" />
      <Button label="Large size and icon" icon="deploy-small" size="l" />
      <Button label="Medium size and icon" icon="deploy-small" size="m" />
      <Button label="Small size and icon" icon="deploy-small" size="s" />
      <Button label="Large size pending " pending size="l" />
      <Button label="Medium size pending " pending size="m" />
      <Button label="Small size pending " pending size="s" />
    </Row>
    Tooltip
    <Row className="p10 b1-ccc" align="space-between center">
      <Button label="Test Button Tooltip" tooltip="Test!" />
    </Row>
  </Column>
);

export default TestButton;
