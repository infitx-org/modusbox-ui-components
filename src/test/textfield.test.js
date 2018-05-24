import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TextField from '../components/TextField';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import Icon from '../components/Icon';
import { Loader, Placeholder, InnerButton, Validation } from '../components/Common';

it('renders the textfield', () => {
  const wrapper = shallow(<TextField />);
  expect(wrapper.find('div.input-textfield')).toHaveLength(1);
});

it('renders the textfield value', () => {
  const wrapper = shallow(<TextField value="test-value" />);
  expect(wrapper.find('input').prop('value')).toBe('test-value');
});

it('renders the placeholder', () => {
  const wrapper = shallow(<TextField placeholder="test-textfield" />);
  expect(wrapper.find(Placeholder)).toHaveLength(1);
  expect(wrapper.find(Placeholder).prop('label')).toBe('test-textfield');
});

it('applies the prop className', () => {
  const wrapper = shallow(<TextField className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<TextField id="testTextFieldId" />);
  expect(wrapper.find('#testTextFieldId')).toHaveLength(1);
});

it('renders the disabled state', () => {
  const wrapper = shallow(<TextField disabled />);
  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(true);
});

it('renders the icon', () => {
  const wrapper = mount(<TextField icon="deploy" />);
  expect(wrapper.find(Icon).prop('name')).toBe('deploy');
});

it('renders the pending state', () => {
  const wrapper = shallow(<TextField pending />);
  expect(wrapper.find(Loader)).toHaveLength(1);
});

it('renders the invalid state', () => {
  const wrapper = shallow(<TextField invalid />);
  expect(wrapper.find(Validation)).toHaveLength(1);
});

it('renders the required state', () => {
  const wrapper = shallow(<TextField required />);
  expect(wrapper.find('.mb-input--required')).toHaveLength(1);
});

it('renders the password kind and clicks the toggle icon', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextField type="password" />);
  expect(wrapper.find(Icon)).toHaveLength(1);
  expect(wrapper.find(Icon).prop('name')).toBe('toggle-visible');
  expect(wrapper.find('input').prop('type')).toBe('password');
  wrapper.find(Icon).simulate('click');
  expect(wrapper.find(Icon).prop('name')).toBe('toggle-invisible');
  expect(wrapper.find('input').prop('type')).toBe('text');
});

// Inner button

it('renders the inner button', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextField onButtonClick={mockEvent} buttonText="inner-button-text" />);
  expect(wrapper.find(Button).text()).toBe('inner-button-text');
});

it('renders the inner button disabled', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <TextField onButtonClick={mockEvent} buttonText="inner-button-text" buttonDisabled />
  );
  expect(wrapper.find(Button).prop('disabled')).toBe(true);
});

it('renders the inner button with kind', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <TextField onButtonClick={mockEvent} buttonText="inner-button-text" buttonKind="secondary" />
  );
  expect(wrapper.find(Button).prop('kind')).toBe('secondary');
});

it('renders and clicks the inner button', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextField onButtonClick={mockEvent} buttonText="inner-button-text" />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find(Button).simulate('click');
  expect(mockEvent).toHaveBeenCalled();
});

// Events

it('triggers onfocus when focused', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextField onFocus={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('focus');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onBlur when blurred', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextField onBlur={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('blur');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onChange when changed', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextField onChange={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('change');
  expect(mockEvent).toHaveBeenCalled();
});

// Snapshot

it('renders the textfield correctly when multiple props are set', () => {
  const wrapper = shallow(<TextField value="test-value" id="test-id" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
