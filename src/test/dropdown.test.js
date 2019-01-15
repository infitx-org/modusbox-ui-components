import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Dropdown from '../components/Dropdown';
import Spinner from '../components/Spinner';
import Icon from '../components/Icon';

// Shallow render, no sub-components ( still available children html)

it('renders the label', () => {
  const wrapper = shallow(<Dropdown label="Test-Dropdown" />);
  expect(wrapper.find('span').text()).toBe('Test-Dropdown');
});

it('renders the disabled state', () => {
  const wrapper = shallow(<Dropdown label="Click" disabled />);
  expect(wrapper.find('button').prop('disabled')).toBe(true);
});

it('renders the spinner and sets disabled', () => {
  const wrapper = shallow(<Dropdown pending />);
  expect(wrapper.find('.input-dropdown__icon')).toHaveLength(1);
  expect(wrapper.find(Spinner)).toHaveLength(1);
  expect(wrapper.find('button').prop('disabled')).toBe(true);
});

it('renders spinner with precedence to icon', () => {
  const wrapper = shallow(<Dropdown icon="deploy" pending />);
  expect(wrapper.find(Spinner)).toHaveLength(1);
  expect(wrapper.find(Icon)).toHaveLength(0);
});

it('renders the dropdown icon', () => {
  const wrapper = shallow(<Dropdown icon="deploy" />);
  expect(wrapper.find('.input-dropdown__icon')).toHaveLength(1);
  expect(wrapper.find(Icon)).toHaveLength(1);
});

it('applies the prop className', () => {
  const wrapper = shallow(<Dropdown className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<Dropdown id="testDropdownId" />);
  expect(wrapper.find('#testDropdownId')).toHaveLength(1);
});

it('renders the id on the "button" element', () => {
  const wrapper = shallow(<Dropdown id="testDropdownId" />);
  expect(wrapper.find('button').prop('id')).toBe('testDropdownId');
});

it('renders the default correct kind', () => {
  const wrapper = shallow(<Dropdown />);
  expect(wrapper.find('button').prop('kind')).toBe('primary');
});

it('renders all the kinds', () => {
  ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'dark'].forEach(kind => {
    const wrapper = shallow(<Dropdown kind={kind} />);
    expect(wrapper.find('button').prop('kind')).toBe(kind);
  });
});

it('renders all the "noFill" prop', () => {
  const wrapper = shallow(<Dropdown noFill />);
  expect(wrapper.find('.noFill')).toHaveLength(1);
});

it('renders the large, medium, small sizes', () => {
  const sizes = {
    large: 'l',
    medium: 'm',
    small: 's',
  };
  Object.entries(sizes).forEach(([name, size]) => {
    const wrapper = shallow(<Dropdown size={size} />);
    const className = `input-dropdown__mb-input--${name}`;
    expect(wrapper.find('.mb-input').hasClass(className)).toBeTruthy();
  });
});

it('renders multiple props', () => {
  const wrapper = shallow(<Dropdown label="Test" icon="x" kind="primary" disabled pending noFill />);
  expect(wrapper.find('span').text()).toBe('Test');
  expect(wrapper.find('button').prop('kind')).toBe('primary');
  expect(wrapper.find('button').prop('disabled')).toBe(true);
  expect(wrapper.find(Spinner)).toHaveLength(1);
  expect(wrapper.find(Icon)).toHaveLength(0);
});

// Mount render, include sub-components

it('renders the inner icon component', () => {
  const wrapper = mount(<Dropdown icon="deploy" />);
  expect(wrapper.find('.element-icon')).toHaveLength(1);
});

it('renders the inner spinner component', () => {
  const wrapper = mount(<Dropdown pending />);
  expect(wrapper.find('.element-spinner')).toHaveLength(1);
});

it('renders the spinner component and overrides the icon prop', () => {
  const wrapper = mount(<Dropdown pending icon="deploy" />);
  expect(wrapper.find('.element-icon')).toHaveLength(0);
  expect(wrapper.find('.element-spinner')).toHaveLength(1);
});

it('does not render the popup when not clicked', () => {
  const wrapper = mount(<Dropdown><span>Content!</span></Dropdown>);
  expect(wrapper.find('.input-dropdown__popup').exists()).toBe(false);
});

it('renders the popup when clicked', () => {
  const wrapper = mount(<Dropdown><span>Content!</span></Dropdown>);
  wrapper.find('button').simulate('click');
  expect(wrapper.find('.input-dropdown__popup').exists()).toBe(true);
});

it('closes the popup when clicking again the button', () => {
  const wrapper = mount(<Dropdown><span>Content!</span></Dropdown>);
  wrapper.find('button').simulate('click');
  expect(wrapper.find('.input-dropdown__popup').exists()).toBe(true);
  wrapper.find('button').simulate('click');
  expect(wrapper.find('.input-dropdown__popup').exists()).toBe(false);
});

// Snapshot testing

it('renders the dropdown correctly when multiple props are set', () => {
  const wrapper = shallow(<Dropdown label="Snapshot dropdown" kind="secondary" disabled pending />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
