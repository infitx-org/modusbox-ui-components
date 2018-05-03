import React from 'react';
import Column from '../../components/Column';
import Row from '../../components/Row';

const Block = () => (
  <div
    style={{
      background: '#ddd',
      margin: '5px',
      height: '20px',
      width: '20px',
    }}
  />
);
const BlockBig = () => (
  <div
    style={{
      background: '#eee',
      margin: '5px',
      height: '40px',
      width: '40px',
    }}
  />
);

const columnStyle = {
  border: '1px solid #ccc',
  height: '200px',
  width: '80px',
};
const wrapStyle = { border: '1px solid #ccc', height: '100px' };

const jcs = ['left', 'center', 'right'];
const ais = ['top', 'center', 'bottom'];

const Items = jcs.reduce(
  (p, jc) => [
    ...p,
    ...ais.map(ai => (
      <Column key={`${jc} ${ai}`}>
        <span>
          {' '}
          {jc} {ai}{' '}
        </span>
        <Column style={columnStyle} align={`${jc} ${ai}`} grow="1">
          <Block />
          <BlockBig />
          <Block />
          <BlockBig />
        </Column>
      </Column>
    )),
  ],
  [],
);

const TestColumn = () => (
  <div>
    <div style={{ padding: 10, border: '1px solid #ccc' }}>
      <Row align="center space-between">{Items}</Row>

      <Column style={wrapStyle} wrap>
        <Block />
        <BlockBig />
        <Block />
        <BlockBig />
        <Block />
        <BlockBig />
        <Block />
        <BlockBig />
        <Block />
        <BlockBig />
        <Block />
        <BlockBig />
        <Block />
        <BlockBig />
        <Block />
        <BlockBig />
        <Block />
        <BlockBig />
      </Column>
    </div>
  </div>
);

export default TestColumn;
