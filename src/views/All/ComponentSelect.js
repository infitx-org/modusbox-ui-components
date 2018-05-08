/* eslint no-console: "off" */

import React from 'react';
import Select from '../../components/Select';

let options = [
  {
    label: new Array(100).fill('super Long').toString(),
    value: 'superStrangeValue',
    icon: 'close-small',
  },
  {
    label: 'disabled',
    value: 'disabled',
    disabled: true,
  },
  {
    label: 'disabled2',
    value: 'disabled2',
    disabled: true,
  },
];

function optionMaker(item, index) {
  return {
    label: `label${index}`,
    value: `value${index}`,
  };
}

const otherOptions = new Array(500).fill({}).map(optionMaker);
options = [...options, ...otherOptions];

const TestSelect = () => (
  <div>
    <div style={{ padding: 10, border: '1px solid #ccc' }}>
      <Select placeholder="Default" options={options} selected="value1" />
      <Select placeholder="Pending" options={options} pending />
      <Select
        placeholder="Invalid"
        options={options}
        invalid
        invalidMessages={['This is a test', 'This is invalid']}
      />
      <Select placeholder="Required" options={options} required />
      <Select placeholder="Disabled" options={options} disabled />
      <Select placeholder="Events (console)" options={options} onChange={console.log} />
    </div>
    <div style={{ padding: 10, border: '1px solid #ccc' }}>
      <Select id="x" placeholder="placeholder" options={options} pending />
      <Select placeholder="Position 2 options" options={[options[0], options[1]]} />
      <Select id="x" placeholder="placeholder" options={options} disabled />
      <Select id="x" placeholder="placeholder" options={options} />
      <Select id="x" placeholder="placeholder" options={options} />
      <Select id="x" placeholder="placeholder" options={options} />
    </div>
    <div style={{ padding: 10, border: '1px solid #ccc' }}>
      <Select id="test-select-1" placeholder="placeholder" options={options} />
      <Select id="test-select-2" placeholder="placeholder" options={options} pending />
      <Select id="test-select-3" placeholder="placeholder" options={options} disabled />
    </div>
  </div>
);

export default TestSelect;
