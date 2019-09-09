/* eslint no-console: "off" */
import React from 'react';

import Row from '../../components/Row';
import Select from '../../components/Select';

let options = [
  {
    label: new Array(100).fill('super Long').toString(),
    value: 'superStrangeValue',
    icon: 'close-small',
  },
  {
    label: 'z',
    value: 'z',
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

const otherOptions = new Array(50).fill({}).map(optionMaker);
options = [...options, ...otherOptions];

const TestSelect = () => (
  <div>
    <div className="p10 b1-ccc">
      <Select className="m5" placeholder="Default" options={options} selected="value13" />
      <Select className="m5" placeholder="Pending" options={options} pending />
      <Select
        className="m5"
        placeholder="Invalid"
        options={options}
        invalid
        invalidMessages={[
          { message: 'This is a test', active: true },
          { message: 'This is invalid', active: false },
        ]}
      />
      <Select className="m5" placeholder="Required" options={options} required />
      <Select className="m5" placeholder="Disabled" options={options} disabled />
      <Select className="m5" placeholder="Clearable" options={options} onClear={console.log} />
      <Select
        className="m5"
        placeholder="Events (console)"
        options={options}
        onChange={value => console.log('onChange', value)}
        onClick={() => console.log('onClick')}
        onBlur={() => console.log('onBlur')}
        onFocus={() => console.log('onFocus')}
        onClear={() => console.log('onClear')}
      />
      <Select
        className="m5"
        placeholder="Sorted"
        options={options}
        sortBy="value"
        sortAsc={false}
      />
    </div>
    <div className="p10 b1-ccc">
      <Select className="m5" id="x" placeholder="placeholder" options={options} pending />
      <Select className="m5" placeholder="Position 2 options" options={[options[0], options[1]]} />
      <Select className="m5" id="x" placeholder="placeholder" options={options} disabled />
      <Select className="m5" id="x" placeholder="placeholder" options={options} />
      <Select className="m5" id="x" placeholder="placeholder" options={options} />
      <Select className="m5" id="x" placeholder="placeholder" options={options} />
    </div>
    <div className="p10 b1-ccc">
      <Select className="m5" id="test-select-1" placeholder="placeholder" options={options} />
      <Select
        className="m5"
        id="test-select-2"
        placeholder="placeholder"
        options={options}
        pending
      />
      <Select
        className="m5"
        id="test-select-3"
        placeholder="placeholder"
        options={options}
        disabled
      />
    </div>

    <Row className="p10 b1-ccc" align="space-between center">
      <Select className="m5" placeholder="small" size="s" options={options} />
      <Select className="m5" placeholder="medium" size="m" options={options} />
      <Select className="m5" placeholder="large" size="l" options={options} />
      <Select className="m5" placeholder="small" size="s" options={options} pending />
      <Select className="m5" placeholder="medium" size="m" options={options} pending />
      <Select className="m5" placeholder="large" size="l" options={options} pending />
    </Row>
    <Row className="p10 b1-ccc" align="space-between center">
      <Select className="m5" placeholder="small" size="s" options={options} onClear={console.log} />
      <Select
        className="m5"
        placeholder="medium"
        size="m"
        options={options}
        onClear={console.log}
      />
      <Select className="m5" placeholder="large" size="l" options={options} onClear={console.log} />
      <Select className="m5" placeholder="small" size="s" options={options} pending />
      <Select className="m5" placeholder="medium" size="m" options={options} pending />
      <Select className="m5" placeholder="large" size="l" options={options} pending />
    </Row>
  </div>
);

export default TestSelect;
