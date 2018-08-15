import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Select from '../components/Select';
import Options from '../components/Select/Options';

import Spinner from '../components/Spinner';
import Icon from '../components/Icon';
import { Loader, Placeholder, InnerButton, Validation } from '../components/Common';

const options = new Array(100).fill().map((item, index) => ({
  label: `label-${index}`,
  value: `value-${index}`,
}));

it('renders the Select', () => {
  const wrapper = shallow(<Select />);
  expect(wrapper.find('div.input-select')).toHaveLength(1);
});

it('renders the Select label for given value when option exists', () => {
  const wrapper = shallow(<Select selected="value-1" options={options} />);
  expect(wrapper.find('input[type="text"]').prop('value')).toBe('label-1');
});

it('renders empty label for given value when option does not exists', () => {
  const wrapper = shallow(<Select selected="value-1000" options={options} />);
  expect(wrapper.find('input[type="text"]').prop('value')).toBe('');
});

it('renders the placeholder', () => {
  const wrapper = shallow(<Select placeholder="test-Select" />);
  expect(wrapper.find(Placeholder)).toHaveLength(1);
  expect(wrapper.find(Placeholder).prop('label')).toBe('test-Select');
});

it('applies the prop className', () => {
  const wrapper = shallow(<Select className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<Select id="testSelectId" />);
  expect(wrapper.find('#testSelectId')).toHaveLength(1);
});

it('renders the disabled state', () => {
  const wrapper = shallow(<Select disabled />);
  expect(wrapper.find('input[type="text"]').prop('disabled')).toBe(true);
});

it('renders the pending state', () => {
  const wrapper = shallow(<Select pending />);
  expect(wrapper.find(Loader)).toHaveLength(1);
});

it('renders the invalid state', () => {
  const wrapper = shallow(<Select invalid />);
  expect(wrapper.find(Validation)).toHaveLength(1);
});

it('renders the required state', () => {
  const wrapper = shallow(<Select required />);
  expect(wrapper.find('.mb-input--required')).toHaveLength(1);
});

it('renders the options when focused', () => {
  const wrapper = mount(<Select options={options} />);
  wrapper.find('input[type="text"]').simulate('click');
  expect(wrapper.find(Options)).toHaveLength(1);
  expect(wrapper.find('.input-select__options-item')).toHaveLength(100);
});

it('selects a value when clicking an option', () => {
  const wrapper = mount(<Select options={options} />);
  wrapper.find('input[type="text"]').simulate('click');
  wrapper
    .find('.input-select__options-item')
    .at(50)
    .simulate('click');
  expect(wrapper.find('input[type="text"]').prop('value')).toBe('label-50');
});

it('renders the clear option', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Select onClear={mockEvent} options={options}/>);

  wrapper.find('input[type="text"]').simulate('click');
  const clearOptionBeforeSelection = wrapper.find('.input-select__options-item--clear');

  wrapper
    .find('.input-select__options-item')
    .at(50)
    .simulate('click');

  wrapper.find('input[type="text"]').simulate('click');
  const clearOptionAfterSelection = wrapper.find('.input-select__options-item--clear');

  expect(clearOptionBeforeSelection.exists()).toEqual(false);
  expect(clearOptionAfterSelection.exists()).toEqual(true);
});

it('clears the selected option when clear option is clicked', () => {
  const clearMockEvent = jest.fn();
  const wrapper = mount(<Select onClear={clearMockEvent} options={options}/>);

  wrapper.find('input[type="text"]').simulate('click');
  wrapper
    .find('.input-select__options-item')
    .at(50)
    .simulate('click');

  const selectedValueBeforeClear = wrapper.find('input[type="text"]').prop('value');

  wrapper.find('input[type="text"]').simulate('click');
  wrapper
    .find('.input-select__options-item--clear')
    .simulate('click');

  const selectedValueAfterClear = wrapper.find('input[type="text"]').prop('value');

  expect(selectedValueBeforeClear).toBe('label-50');
  expect(selectedValueAfterClear).toBe('');
  expect(clearMockEvent).toHaveBeenCalled();

});

it('triggers onFocus when focused', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Select onFocus={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input[type="text"]').simulate('focus');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onBlur when selecting a value', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Select onBlur={mockEvent} options={options} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input[type="text"]').simulate('click');
  wrapper
    .find('.input-select__options-item')
    .at(50)
    .simulate('click');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onChange when selecting value', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Select onChange={mockEvent} options={options} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input[type="text"]').simulate('click');
  wrapper
    .find('.input-select__options-item')
    .at(50)
    .simulate('click');
  expect(mockEvent).toHaveBeenCalledWith('value-50');
});

it('renders the Select correctly when multiple props are set', () => {
  const wrapper = shallow(<Select value="value-1" id="test-id" options={options} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
