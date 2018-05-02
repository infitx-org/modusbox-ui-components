import React from 'react';
import Column from '../../components/Column';
import Row from '../../components/Row';

const Block = () => (<div style={{
  background: '#ddd', margin: '5px', height: '20px', width: '20px',
}}
/>);
const BlockBig = () => (<div style={{
  background: '#eee', margin: '5px', height: '40px', width: '40px',
}}
/>);

const rowStyle = { border: '1px solid #ccc' };

const jcs = ['left', 'center', 'right'];
const ais = ['top', 'center', 'bottom'];

const ComposedItems = jcs.reduce(
  (p, jc) => [
    ...p,
    ...ais.map(ai => (
      <div key={`${jc} ${ai}`} style={{ width: '100%' }}>
        <span>{jc} {ai}</span>
        <Row style={rowStyle} align={`${jc} ${ai}`}>
          <Block />
          <BlockBig />
          <Block />
          <BlockBig />
        </Row>
      </div>
    )),
  ],
  [],
);

const SimpleItems = [
  <div style={{ width: '100%' }}>
    <Row style={rowStyle} align="left">
      <Block />
      <BlockBig />
      <Block />
      <BlockBig />
    </Row>
  </div>,
];

const TestRow = () => (
  <Row style={{ padding: 10, border: '1px solid #ccc' }}>
    <Column align="center space-between">
      {SimpleItems}
      {ComposedItems}
    </Column>
  </Row>
);

export default TestRow;
