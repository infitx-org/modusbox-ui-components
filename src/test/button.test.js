import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import Button from '../components/Button';
import Icon from '../components/Icon';
import Spinner from '../components/Spinner';

// Shallow render, no sub-components ( still available children html)

it('renders the label', () => {
  const wrapper = shallow(<Button label="Test-Button" />);
  expect(wrapper.find('span').text()).toBe('Test-Button');
});

it('renders the disabled state', () => {
  const wrapper = shallow(<Button label="Click" disabled />);
  expect(wrapper.find('button').prop('disabled')).toBe(true);
});

it('renders the spinner and sets disabled', () => {
  const wrapper = shallow(<Button pending />);
  expect(wrapper.find('.input-button__icon')).toHaveLength(1);
  expect(wrapper.find(Spinner)).toHaveLength(1);
  expect(wrapper.find('button').prop('disabled')).toBe(true);
});

it('renders spinner with precedence to icon', () => {
  const wrapper = shallow(<Button icon="deploy" pending />);
  expect(wrapper.find(Spinner)).toHaveLength(1);
  expect(wrapper.find(Icon)).toHaveLength(0);
});

it('renders the button icon', () => {
  const wrapper = shallow(<Button icon="deploy" />);
  expect(wrapper.find('.input-button__icon')).toHaveLength(1);
  expect(wrapper.find(Icon)).toHaveLength(1);
});

it('applies the prop className', () => {
  const wrapper = shallow(<Button className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<Button id="testButtonId" />);
  expect(wrapper.find('#testButtonId')).toHaveLength(1);
});

it('renders the id on the "button" element', () => {
  const wrapper = shallow(<Button id="testButtonId" />);
  expect(wrapper.find('button').prop('id')).toBe('testButtonId');
});

it('renders the default correct kind', () => {
  const wrapper = shallow(<Button />);
  expect(wrapper.find('button').prop('kind')).toBe('primary');
});

it('renders all the kinds', () => {
  ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'dark'].forEach(kind => {
    const wrapper = shallow(<Button kind={kind} />);
    expect(wrapper.find('button').prop('kind')).toBe(kind);
  });
});

it('renders all the "noFill" prop', () => {
  const wrapper = shallow(<Button noFill />);
  expect(wrapper.find('.noFill')).toHaveLength(1);
});

it('renders the large, medium, small sizes', () => {
  const sizes = {
    large: 'l',
    medium: 'm',
    small: 's',
  };
  Object.entries(sizes).forEach(([name, size]) => {
    const wrapper = shallow(<Button size={size} />);
    const className = `input-button__mb-input--${name}`;
    expect(wrapper.find('.mb-input').hasClass(className)).toBeTruthy();
  });
});

it('triggers the onClick prop', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Button onClick={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.simulate('click');
  expect(mockEvent).toHaveBeenCalled();
});

it('renders multiple props', () => {
  const wrapper = shallow(<Button label="Test" icon="x" kind="primary" disabled pending noFill />);
  expect(wrapper.find('span').text()).toBe('Test');
  expect(wrapper.find('button').prop('kind')).toBe('primary');
  expect(wrapper.find('button').prop('disabled')).toBe(true);
  expect(wrapper.find(Spinner)).toHaveLength(1);
  expect(wrapper.find(Icon)).toHaveLength(0);
});

// Mount render, include sub-components

it('renders the inner icon component', () => {
  const wrapper = mount(<Button icon="deploy" />);
  expect(wrapper.find('.element-icon')).toHaveLength(1);
});

it('renders the inner spinner component', () => {
  const wrapper = mount(<Button pending />);
  expect(wrapper.find('.element-spinner')).toHaveLength(1);
});

it('renders the spinner component and overrides the icon prop', () => {
  const wrapper = mount(<Button pending icon="deploy" />);
  expect(wrapper.find('.element-icon')).toHaveLength(0);
  expect(wrapper.find('.element-spinner')).toHaveLength(1);
});

// Snapshot testing

it('renders the button correctly when multiple props are set', () => {
  const wrapper = shallow(<Button label="Snapshot button" kind="secondary" disabled pending />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
