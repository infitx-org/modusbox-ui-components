import React from 'react';

import Row from '../../../components/Row';
import Column from '../../../components/Column';

import './ColorBox.scss';

const colors = {
  main: [
    'main-primary',
    'main-secondary',
    'main-tertiary',
    'main-success',
    'main-danger',
    'main-warning',
    'main-disabled',
    'main-primary--active',
    'main-secondary--active',
    'main-tertiary--active',
    'main-success--active',
    'main-danger--active',
    'main-warning--active',
    'main-disabled--active',
  ],
  blue: [
    'blue-1',
    'blue-2',
    'blue-3',
    'blue-4',
    'blue-5',
  ],
  'dark-blue': [
    'dark-blue-1',
    'dark-blue-2',
    'dark-blue-3',
    'dark-blue-4',
    'dark-blue-5',
  ],
  green: [
    'green-1',
    'green-2',
    'green-3',
    'green-4',
    'green-5',
  ],
  gray: [
    'gray-1',
    'gray-2',
    'gray-3',
    'gray-4',
    'gray-5',
  ],
  'dark-gray': [
    'dark-gray-1',
    'dark-gray-2',
    'dark-gray-3',
    'dark-gray-4',
    'dark-gray-5',
  ],
  alpha: [
    'alpha-1',
    'alpha-2',
    'alpha-3',
    'alpha-4',
    'alpha-5',
  ],
  plain: [
    'white',
    'yellow',
    'viridian',
    'teal',
    'navy',
    'indigo',
    'violet',
    'red',
  ],
};

const ColorRow = ({ type, rowColors }) => (
  <Column align="center left">
    <span>{type}</span>
    {rowColors.map(color => <ColorBlock color={color} />)}
  </Column>
);

const ColorBlock = ({ color }) => (
  <div className={`color-box color-box--${color}`}>
    <div className="color-box__title">{color}</div>
  </div>
);
const TestColor = () => (
  <Column style={{ padding: '10px' }}>
    <Row style={{ padding: '10px', border: '1px solid #ccc' }} align="space-between top" wrap>
      {Object.keys(colors).map(type => <ColorRow type={type} colors={colors[type]} />)}
    </Row>
  </Column>
);

export default TestColor;
