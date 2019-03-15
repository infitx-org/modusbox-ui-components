import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DatePicker from '../components/DatePicker';
import Icon from '../components/Icon';
import { Loader, Placeholder, ValidationWrapper, InvalidIcon } from '../components/Common';

it('renders the datepicker', () => {
  const wrapper = mount(<DatePicker />);
  expect(wrapper.find('div.input-datepicker__component')).toHaveLength(1);
});

it('renders the datepicker value', () => {
  const wrapper = mount(<DatePicker value="1526478000000" />);
  expect(wrapper.find('input').prop('value')).not.toBe('');
});

it('renders the placeholder', () => {
  const wrapper = mount(<DatePicker placeholder="test-datepicker" />);
  expect(wrapper.find(Placeholder)).toHaveLength(1);
  expect(wrapper.find(Placeholder).prop('label')).toBe('test-datepicker');
});

it('renders the validation wrapper', () => {
  const wrapper = shallow(<DatePicker placeholder="test-Select" />);
  expect(wrapper.find(ValidationWrapper)).toHaveLength(1);
});

it('applies the prop className', () => {
  const wrapper = mount(<DatePicker className="test" />);
  expect(wrapper.find('div.input-datepicker__component').hasClass('test')).toBeTruthy();
});

it('renders the prop id', () => {
  const wrapper = mount(<DatePicker id="testDatePickerId" />);
  expect(wrapper.find('div.input-datepicker__component').find('#testDatePickerId')).toHaveLength(1);
});

it('renders the disabled state', () => {
  const wrapper = mount(<DatePicker disabled />);
  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(true);
});

it('renders the icon', () => {
  const wrapper = mount(<DatePicker />);
  expect(wrapper.find(Icon)).toHaveLength(1);
});

it('renders the pending state', () => {
  const wrapper = mount(<DatePicker pending />);
  expect(wrapper.find(Loader)).toHaveLength(1);
});

it('renders the invalid state', () => {
  const wrapper = mount(<DatePicker invalid />);
  expect(wrapper.find(InvalidIcon)).toHaveLength(1);
});

it('renders the required state', () => {
  const wrapper = shallow(<DatePicker required />);
  expect(wrapper.find('.mb-input--required')).toHaveLength(1);
});

it('renders the large, medium, small sizes', () => {
  const sizes = {
    large: 'l',
    medium: 'm',
    small: 's',
  };
  Object.entries(sizes).forEach(([name, size]) => {
    const wrapper = shallow(<DatePicker size={size} />);
    const className = `mb-input--${name}`;
    expect(wrapper.find('.mb-input').hasClass(className)).toBeTruthy();
  });
});

// Events

it('renders the calendar when focused', () => {
  const wrapper = mount(<DatePicker />);
  wrapper.find('input').simulate('focus');
  expect(wrapper.find('.input-datepicker--position')).toHaveLength(1);
});

it('does not close the calendar when selecting a day', () => {
  const wrapper = mount(<DatePicker />);
  wrapper.find('input').simulate('focus');
  expect(wrapper.find('.input-datepicker--position')).toHaveLength(1);
  wrapper
    .find('.DayPicker-Day')
    .at(10)
    .simulate('click');
  expect(wrapper.find('.input-datepicker--position')).toHaveLength(1);
  expect(wrapper.find('input').prop('value')).not.toBe('');
});

it('triggers onFocus when focused', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<DatePicker onFocus={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('focus');
  expect(mockEvent).toHaveBeenCalled();
});

// Snapshot

it('renders the datepicker correctly when multiple props are set', () => {
  const wrapper = shallow(<DatePicker value="test-value" id="test-id" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
