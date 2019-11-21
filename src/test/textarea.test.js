import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import Button from '../components/Button';
import { InvalidIcon, Loader, Placeholder, ValidationWrapper } from '../components/Common';
import Icon from '../components/Icon';
import TextArea from '../components/TextArea';

it('renders the textarea', () => {
  const wrapper = shallow(<TextArea />);
  expect(wrapper.find('div.input-textarea__component')).toHaveLength(1);
});

it('renders the textarea value', () => {
  const wrapper = shallow(<TextArea value="test-value" />);
  expect(wrapper.find('textarea').prop('value')).toBe('test-value');
});

it('renders the placeholder', () => {
  const wrapper = shallow(<TextArea placeholder="test-textarea" />);
  expect(wrapper.find(Placeholder)).toHaveLength(1);
  expect(wrapper.find(Placeholder).prop('label')).toBe('test-textarea');
});

it('renders the validation wrapper', () => {
  const wrapper = shallow(<TextArea placeholder="test-Select" />);
  expect(wrapper.find(ValidationWrapper)).toHaveLength(1);
});

it('applies the prop className', () => {
  const wrapper = shallow(<TextArea className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<TextArea id="testTextAreaId" />);
  expect(wrapper.find('#testTextAreaId')).toHaveLength(1);
});

it('renders the disabled state', () => {
  const wrapper = shallow(<TextArea disabled />);
  expect(wrapper.find('textarea')).toHaveLength(1);
  expect(wrapper.find('textarea').prop('disabled')).toBe(true);
});

it('renders the icon', () => {
  const wrapper = mount(<TextArea icon="deploy" />);
  expect(wrapper.find(Icon).prop('name')).toBe('deploy');
});

it('renders the pending state', () => {
  const wrapper = shallow(<TextArea pending />);
  expect(wrapper.find(Loader)).toHaveLength(1);
});

it('renders the invalid state', () => {
  const wrapper = shallow(<TextArea invalid />);
  expect(wrapper.find(InvalidIcon)).toHaveLength(1);
});

it('renders the required state', () => {
  const wrapper = shallow(<TextArea required />);
  expect(wrapper.find('.mb-input--required')).toHaveLength(1);
});

it('renders the large, medium, small sizes', () => {
  const sizes = {
    large: 'l',
    medium: 'm',
    small: 's',
  };
  Object.entries(sizes).forEach(([name, size]) => {
    const wrapper = shallow(<TextArea size={size} />);
    const className = `mb-input--${name}`;
    expect(wrapper.find('.mb-input').hasClass(className)).toBeTruthy();
  });
});

it('renders the inner button', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextArea onButtonClick={mockEvent} buttonText="inner-button-text" />);
  expect(wrapper.find(Button).text()).toBe('inner-button-text');
});

it('renders the inner button disabled', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <TextArea onButtonClick={mockEvent} buttonText="inner-button-text" buttonDisabled />,
  );
  expect(wrapper.find(Button).prop('disabled')).toBe(true);
});

it('renders the inner button with kind', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <TextArea onButtonClick={mockEvent} buttonText="inner-button-text" buttonKind="secondary" />,
  );
  expect(wrapper.find(Button).prop('kind')).toBe('secondary');
});

it('renders and clicks the inner button', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextArea onButtonClick={mockEvent} buttonText="inner-button-text" />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find(Button).simulate('click');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onfocus when focused', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextArea onFocus={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('textarea').simulate('focus');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onBlur when blurred', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextArea onBlur={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('textarea').simulate('blur');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onChange when changed', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextArea onChange={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('textarea').simulate('change');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onChange with a number value when prop type is number', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextArea onChange={mockEvent} type="number" />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('textarea').simulate('change', { target: { value: 12 } });
  expect(mockEvent).toHaveBeenCalledWith(12);
});

// Snapshot

it('renders the textarea correctly when multiple props are set', () => {
  const wrapper = shallow(<TextArea value="test-value" id="test-id" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
