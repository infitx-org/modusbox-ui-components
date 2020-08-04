import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import Toggle from '../components/Toggle';

it('renders the toggle', () => {
  const wrapper = shallow(<Toggle />);
  expect(wrapper.find('div.input-toggle')).toHaveLength(1);
});

it('renders the toggle value', () => {
  const wrapper = shallow(<Toggle checked />);
  expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(true);
});

it('renders the label', () => {
  const wrapper = shallow(<Toggle label="test-toggle" />);
  expect(wrapper.find('label')).toHaveLength(1);
  expect(wrapper.find('label').text()).toBe('test-toggle');
});

it('applies the prop className', () => {
  const wrapper = shallow(<Toggle className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<Toggle id="testToggleId" />);
  expect(wrapper.find('#testToggleId')).toHaveLength(1);
});

it('renders the disabled state', () => {
  const wrapper = shallow(<Toggle disabled />);
  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(true);
});

// Events

it('triggers onFocus when focused', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Toggle onFocus={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('focus');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onBlur when blurred', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Toggle onBlur={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('blur');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onChange when changed', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Toggle onChange={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('label').simulate('click');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onChange when pressing Enter key', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Toggle onChange={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });
  expect(mockEvent).toHaveBeenCalled();
  expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(true);
});

it('triggers onBlur when blurring', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Toggle onBlur={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('blur', { key: 'Tab', keyCode: 9, which: 9 });
  expect(mockEvent).toHaveBeenCalled();
});

// Snapshot

it('renders the toggle correctly when multiple props are set', () => {
  const wrapper = shallow(<Toggle checked id="test-id" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
