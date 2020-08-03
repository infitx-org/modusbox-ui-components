/* eslint no-console: "off" */
import React from 'react';

import Row from '../Row';
import ControlIcon from './ControlIcon';

export default {
  title: 'ControlIcon',
  component: ControlIcon,
};

const { log } = console;

export const AllKinds = () => (
  <Row align="left center">
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="default" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="primary" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="secondary" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="tertiary" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="success" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="danger" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="warning" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="dark" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="light" onClick={log} />
    </div>
  </Row>
);

export const AllKindsDisabled = () => (
  <Row align="left center">
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="default" disabled onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="primary" disabled onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="secondary" disabled onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="tertiary" disabled onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="success" disabled onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="danger" disabled onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="warning" disabled onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" kind="dark" disabled onClick={log} />
    </div>
  </Row>
);

export const MultipleSizes = () => (
  <Row align="left center" wrap>
    {[...Array(30).keys()]
      .map(v => 10 + v * 2)
      .map(size => (
        <div className="m5" key={size}>
          <ControlIcon icon="deploy-small" onClick={log} size={size} />
        </div>
      ))}
  </Row>
);

export const WithTooltip = () => (
  <Row align="left center">
    <div className="m5">
      <ControlIcon icon="deploy-small" tooltip="default" kind="default" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" tooltip="primary" kind="primary" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" tooltip="secondary" kind="secondary" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" tooltip="tertiary" kind="tertiary" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" tooltip="success" kind="success" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" tooltip="danger" kind="danger" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" tooltip="warning" kind="warning" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" tooltip="dark" kind="dark" onClick={log} />
    </div>
    <div className="m5">
      <ControlIcon icon="deploy-small" tooltip="light" kind="light" onClick={log} />
    </div>
  </Row>
);
