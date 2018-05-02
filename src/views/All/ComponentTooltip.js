import React from 'react';

import Icon from '../../components/Icon';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Tooltip from '../../components/Tooltip';

const style = { width: '100px' };

const TestButton = () => (
  <Column style={{ padding: '10px' }}>
    <Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
      <Tooltip content={<div>ciao</div>}> Very loooooooooooooong content... </Tooltip>
      <Tooltip label="boh..."> Very loooooooooooooong content... </Tooltip>
      <Tooltip style={style}> Very loooooooooooooong content... </Tooltip>
    </Row>

    <Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
      <Tooltip style={style}> Very loooooooooooooong content... </Tooltip>
    </Row>

    <Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
      <Tooltip style={style}> {new Array(100).fill('super Long')} </Tooltip>
    </Row>

    <Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
      <Tooltip style={style}> Very loooooooooooooong content... </Tooltip>
    </Row>

    <Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
      <Tooltip style={style}>
        <Row>
          <Icon name="close-small" size={16} /> Very loooooooooooooong content...
        </Row>
      </Tooltip>
    </Row>

    <Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
      <Tooltip style={style} position="left">
        {' '}
        LEFT POSITIONED with a super long content{' '}
      </Tooltip>
    </Row>

    <Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
      <Tooltip style={style} position="right">
        {' '}
        RIGHt POSITIONED with a super long content{' '}
      </Tooltip>
    </Row>

    <Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
      <Tooltip style={style} position="top">
        {' '}
        TOP POSITIONED with a super long content{' '}
      </Tooltip>
    </Row>

    <Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
      <Tooltip style={style} position="bottom">
        {' '}
        BOTTOM POSITIONED with a super long content{' '}
      </Tooltip>
    </Row>
  </Column>
);

export default TestButton;
