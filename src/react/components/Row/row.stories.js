/* eslint no-console: "off" */
import React from 'react';

import Column from '../Column';
import Row from './Row';

export default {
  title: 'Row',
  component: Row,
};

const rowStyle = {
  backgroundColor: '#eee',
  height: '200px',
  margin: '5px',
};

const smallBlockStyle = {
  background: '#ccc',
  margin: '5px',
  height: '40px',
  width: '40px',
};

const bigBlockStyle = {
  background: '#ddd',
  margin: '5px',
  height: '80px',
  width: '80px',
};

const Block = () => <div style={smallBlockStyle} />;
const BlockBig = () => <div style={bigBlockStyle} />;

const Blocks = () => [
  <Block key="block-block-1" />,
  <BlockBig key="block-blockbig-1" />,
  <Block key="block-block-2" />,
  <BlockBig key="block-blockbig-2" />,
];

export const AlignLeft = () => (
  <Column align="center space-between">
    <Row align="left top" style={rowStyle}>
      <Blocks />
    </Row>
    <Row align="left center" style={rowStyle}>
      <Blocks />
    </Row>
    <Row align="left bottom" style={rowStyle}>
      <Blocks />
    </Row>
  </Column>
);

export const AlignCenter = () => (
  <Column align="center space-between">
    <Row align="center top" style={rowStyle}>
      <Blocks />
    </Row>
    <Row align="center center" style={rowStyle}>
      <Blocks />
    </Row>
    <Row align="center bottom" style={rowStyle}>
      <Blocks />
    </Row>
  </Column>
);

export const AlignRight = () => (
  <Column align="center space-between">
    <Row align="right top" style={rowStyle}>
      <Blocks />
    </Row>
    <Row align="right center" style={rowStyle}>
      <Blocks />
    </Row>
    <Row align="right bottom" style={rowStyle}>
      <Blocks />
    </Row>
  </Column>
);

export const Wrap = () => (
  <Column align="center">
    <Row style={rowStyle} wrap>
      {[...Array(30)].map((_, i) => (
        <BlockBig key={i.toString()} />
      ))}
    </Row>
  </Column>
);
