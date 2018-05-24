import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import RadioGroup from '../components/RadioGroup';

const options = [
  {
    label: 'label1',
    value: 'value1',
  },
  {
    label: 'label2',
    value: 'value2',
    disabled: true,
  },
  {
    label: 'label3',
    value: 'value3',
  },
  {
    label: 'label4',
    value: 'value4',
  },
  {
    label: 'label5',
    value: 'value5',
  },
];

it('renders the radiogroup', () => {
  const wrapper = shallow(<RadioGroup options={options} />);
  expect(wrapper.find('.input-radio')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<RadioGroup options={options} id="testRadioId" />);
  expect(wrapper.find('#testRadioId')).toHaveLength(1);
});

it('renders the prop label', () => {
  const wrapper = shallow(<RadioGroup options={options} label="test-radio" />);
  expect(wrapper.find('span')).toHaveLength(1);
  expect(wrapper.find('span').text()).toBe('test-radio');
});

it('renders the disabled state', () => {
  const wrapper = shallow(<RadioGroup options={options} disabled />);
  expect(wrapper.find('.input-radio').hasClass('disabled')).toBe(true);
});

it('renders the radio options', () => {
  const wrapper = mount(<RadioGroup options={options} />);
  expect(wrapper.find('.input-radio__option')).toHaveLength(5);
});

it('renders the radio options labels', () => {
  const wrapper = mount(<RadioGroup options={options} />);
  expect(
    wrapper
      .find('.input-radio__option label')
      .at(0)
      .text()
  ).toBe('label1');
});

it('renders the selected radio option', () => {
  const wrapper = mount(<RadioGroup options={options} value="value4" />);
  expect(wrapper.find('.input-radio__input.checked')).toHaveLength(1);
});

it('renders the selected radio option', () => {
  const wrapper = mount(<RadioGroup options={options} value="value4" />);
  expect(wrapper.find('.input-radio__option.checked label').text()).toBe('label4');
});

it('triggers onChange when changed', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<RadioGroup options={options} onChange={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper
    .find('.input-radio__option')
    .at(4)
    .simulate('click');
  expect(mockEvent).toHaveBeenCalled();
});

it('Changes selected radio when using Arrow keys', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<RadioGroup options={options} value="value1" onChange={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper
    .find('.mb-input__holder')
    .at(0)
    .simulate('focus');
  expect(wrapper.find('.input-radio__input.focused')).toHaveLength(1);
  wrapper
    .find('.mb-input__holder')
    .at(0)
    .simulate('keyDown', { key: 'Arrow Right', keyCode: 39, which: 39 });
  expect(mockEvent).toHaveBeenCalled();
});

it('Does not select a disabled option', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<RadioGroup options={options} value="value1" onChange={mockEvent} />);
  wrapper
    .find('.input-radio__option')
    .at(1)
    .simulate('click');
  expect(mockEvent).not.toHaveBeenCalled();
});

// Snapshot

it('renders the checkbox correctly when multiple props are set', () => {
  const wrapper = shallow(<RadioGroup options={options} id="test-radio" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
