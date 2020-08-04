/* eslint no-console: "off" */
import React from 'react';

import Button from '../../components/Button';
import Column from '../../components/Column';
import Dropdown from '../../components/Dropdown';
import Row from '../../components/Row';
import Spinner from '../../components/Spinner';

const rowStyle = { padding: '10px', border: '1px solid #ccc' };

const DropdownContent = () => (
  <Column align="center">
    <Button label="I am a button" />
    <Row>
      <Spinner size={20} />
      <Spinner size={15} />
      <Spinner size={10} />
    </Row>
  </Column>
);

const TestDropdown = () => (
  <Column style={{ padding: '10px' }}>
    All kinds regular
    <Row style={rowStyle} align="space-between center">
      <Dropdown label="Primary" kind="primary">
        <img
          width="436"
          height="245"
          alt="Works!"
          src="https://i.ytimg.com/vi/X_BFAvA8Scc/maxresdefault.jpg"
        />
      </Dropdown>
      <Dropdown label="Secondary" kind="secondary">
        <DropdownContent />
      </Dropdown>
      <Dropdown label="Tertiary" kind="tertiary">
        <DropdownContent />
      </Dropdown>
      <Dropdown label="Success" kind="success">
        <DropdownContent />
      </Dropdown>
      <Dropdown label="Danger" kind="danger">
        <DropdownContent />
      </Dropdown>
      <Dropdown label="Warning" kind="warning">
        <DropdownContent />
      </Dropdown>
      <Dropdown label="Dark" kind="dark">
        <DropdownContent />
      </Dropdown>
      <Dropdown label="Light" kind="light">
        <DropdownContent />
      </Dropdown>
      <Dropdown label="Icon" icon="deploy-small">
        <DropdownContent />
      </Dropdown>
    </Row>
    All kinds noFill
    <Row style={{ ...rowStyle, background: '#333' }} align="space-between center">
      <Dropdown noFill label="Primary" kind="primary" />
      <Dropdown noFill label="Secondary" kind="secondary" />
      <Dropdown noFill label="Tertiary" kind="tertiary" />
      <Dropdown noFill label="Success" kind="success" />
      <Dropdown noFill label="Danger" kind="danger" />
      <Dropdown noFill label="Warning" kind="warning" />
      <Dropdown noFill label="Dark" kind="dark" />
      <Dropdown noFill label="Light" kind="light" />
      <Dropdown noFill label="Events" onClick={console.log} />
      <Dropdown noFill label="Icon" icon="deploy-small" />
    </Row>
    Pending regular
    <Row style={rowStyle} align="space-between center">
      <Dropdown label="Primary" kind="primary" pending />
      <Dropdown label="Secondary" kind="secondary" pending />
      <Dropdown label="Tertiary" kind="tertiary" pending />
      <Dropdown label="Success" kind="success" pending />
      <Dropdown label="Danger" kind="danger" pending />
      <Dropdown label="Warning" kind="warning" pending />
      <Dropdown label="Dark" kind="dark" pending />
      <Dropdown label="Light" kind="light" pending />
      <Dropdown label="Disabled" disabled pending />
      <Dropdown label="Icon" icon="deploy-small" pending />
    </Row>
    Pending noFill
    <Row style={rowStyle} align="space-between center">
      <Dropdown noFill label="Primary" kind="primary" pending />
      <Dropdown noFill label="Secondary" kind="secondary" pending />
      <Dropdown noFill label="Tertiary" kind="tertiary" pending />
      <Dropdown noFill label="Success" kind="success" pending />
      <Dropdown noFill label="Danger" kind="danger" pending />
      <Dropdown noFill label="Warning" kind="warning" pending />
      <Dropdown noFill label="Dark" kind="dark" pending />
      <Dropdown noFill label="Light" kind="light" pending />
      <Dropdown noFill label="Disabled" disabled pending />
      <Dropdown noFill label="Icon" icon="deploy-small" pending />
    </Row>
    Disabled
    <Row className="p10 b1-ccc" align="space-between center">
      <Dropdown label="Primary" kind="primary" disabled />
      <Dropdown label="Secondary" kind="secondary" disabled />
      <Dropdown label="Tertiary" kind="tertiary" disabled />
      <Dropdown label="Success" kind="success" disabled />
      <Dropdown label="Danger" kind="danger" disabled />
      <Dropdown label="Warning" kind="warning" disabled />
      <Dropdown label="Dark" kind="dark" disabled />
      <Dropdown label="Pending" pending disabled />
      <Dropdown label="Icon" icon="deploy-small" disabled />
      <Dropdown label="No Fill" icon="deploy-small" noFill disabled />
      <Dropdown label="No Fill" icon="deploy-small" noFill kind="secondary" disabled />
      <Dropdown label="No Fill" icon="deploy-small" noFill kind="tertiary" disabled />
      <Dropdown label="No Fill" icon="deploy-small" noFill kind="danger" disabled />
    </Row>
    Sizes
    <Row className="p10 b1-ccc" align="space-between center">
      <Dropdown label="Large size " size="l" />
      <Dropdown label="Medium size " size="m" />
      <Dropdown label="Small size " size="s" />
      <Dropdown label="Large size and icon" icon="deploy-small" size="l" />
      <Dropdown label="Medium size and icon" icon="deploy-small" size="m" />
      <Dropdown label="Small size and icon" icon="deploy-small" size="s" />
      <Dropdown label="Large size pending " pending size="l" />
      <Dropdown label="Medium size pending " pending size="m" />
      <Dropdown label="Small size pending " pending size="s" />
    </Row>
    Tooltip
    <Row className="p10 b1-ccc" align="space-between center">
      <Dropdown label="Test Dropdown Tooltip" tooltip="Test!" />
    </Row>
  </Column>
);

export default TestDropdown;
