/* eslint no-alert: "off" */
/* eslint no-console: "off" */
/* eslint no-console: "off" */
import React from 'react';

import Column from './Column';

export default {
  title: 'Column',
  component: Column,
};

import Row from '../Row';

const Block = () => (
  <div
    style={{
      background: '#ccc',
      margin: '5px',
      height: '40px',
      width: '40px',
    }}
  />
);
const BlockBig = () => (
  <div
    style={{
      background: '#ddd',
      margin: '5px',
      height: '80px',
      width: '80px',
    }}
  />
);

const columnStyle = {
  backgroundColor: '#eee',
  height: '400px',
  width: '200px',
};

const WrappedColumn = ({ ...props }) => (
  <Column style={columnStyle} {...props} grow="0">
    <Block />
    <BlockBig />
    <Block />
    <BlockBig />
  </Column>
);

export const AlignLeft = () => (
  <Row align="space-between">
    <WrappedColumn align="left top" />
    <WrappedColumn align="left center" />
    <WrappedColumn align="left bottom" />
  </Row>
);

export const AlignCenter = () => (
  <Row align="space-between">
    <WrappedColumn align="center top" />
    <WrappedColumn align="center center" />
    <WrappedColumn align="center bottom" />
  </Row>
);

export const AlignRight = () => (
  <Row align="space-between">
    <WrappedColumn align="right top" />
    <WrappedColumn align="right center" />
    <WrappedColumn align="right bottom" />
  </Row>
);

export const Wrap = () => (
  <Row align="space-between">
    <Column style={columnStyle}>
      <BlockBig />
      <BlockBig />
      <BlockBig />
      <BlockBig />
      <BlockBig />
      <BlockBig />
    </Column>
  </Row>
);
