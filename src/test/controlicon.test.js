import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ControlIcon from '../components/ControlIcon';
import Icon from '../components/Icon';
import Tooltip from '../components/Tooltip';

// Shallow render, no sub-components ( still available children html)
it('renders the component', () => {
  const wrapper = shallow(<ControlIcon icon="deploy-small" />);
  expect(wrapper.find('div.control__icon').exists()).toBe(true);
  expect(wrapper.find(Icon).exists()).toBe(true);
});

it('renders the disabled state', () => {
  const wrapper = shallow(<ControlIcon icon="deploy-small" disabled />);
  expect(wrapper.find('div.control__icon').hasClass('control__icon--disabled')).toBe(true);
});

it('renders the active state', () => {
  const wrapper = shallow(<ControlIcon icon="deploy-small" active />);
  expect(wrapper.find('div.control__icon').hasClass('control__icon--active')).toBe(true);
});

it('renders the tooltip', () => {
  const wrapper = shallow(<ControlIcon icon="deploy-small" tooltip="I am the tooltip" />);
  expect(wrapper.find(Tooltip)).toHaveLength(1);
});

it('renders the button icon', () => {
  const wrapper = shallow(<ControlIcon icon="deploy" onClick={jest.fn} />);
  expect(wrapper.find('div.control__icon')).toHaveLength(1);
  expect(wrapper.find(Icon)).toHaveLength(1);
});

it('applies the prop fill', () => {
  const wrapper = shallow(<ControlIcon icon="deploy" fill="#fff" />);
  expect(wrapper.find(Icon).prop('fill')).toBe('#fff');
});

it('applies the prop onClick', () => {
  const wrapper = shallow(<ControlIcon icon="deploy" onClick={jest.fn} />);
  expect(wrapper.find('div.control__icon').prop('onClick')).toBe(jest.fn);
});

it('does not apply the prop onClick when unset', () => {
  const wrapper = shallow(<ControlIcon icon="deploy" />);
  expect(wrapper.find('div.control__icon').prop('onClick')).not.toBe(jest.fn);
});

it('does not apply the prop onClick when disabled', () => {
  const wrapper = shallow(<ControlIcon icon="deploy" onClick={jest.fn} disabled />);
  expect(wrapper.find('div.control__icon').prop('onClick')).not.toBe(jest.fn);
});

it('applies the prop className', () => {
  const wrapper = shallow(<ControlIcon icon="deploy" className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<ControlIcon icon="deploy" id="testControlIconId" />);
  expect(wrapper.find('#testControlIconId')).toHaveLength(1);
});

it('renders the id on the "div" element', () => {
  const wrapper = shallow(<ControlIcon icon="deploy" id="testControlIconId" />);
  expect(wrapper.find('div.control__icon').prop('id')).toBe('testControlIconId');
});

it('renders the default correct kind', () => {
  const wrapper = shallow(<ControlIcon icon="deploy" />);
  expect(wrapper.find('div.control__icon').hasClass('control__icon--default')).toBe(true);
});

it('renders all the kinds', () => {
  ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'dark'].forEach(kind => {
    const wrapper = shallow(<ControlIcon icon="deploy" kind={kind} />);
    expect(wrapper.find('div.control__icon').hasClass(`control__icon--${kind}`)).toBe(true);
  });
});

it('renders the sizes', () => {
  const sizes = [10, 20, 30];
  sizes.forEach(size => {
    const wrapper = shallow(<ControlIcon size={size} icon="deploy" />);
    expect(wrapper.find(Icon).prop('size')).toBe(size);
  });
});

it('triggers the onClick prop', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<ControlIcon onClick={mockEvent} icon="deploy" size={20} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('.control__icon').simulate('click');
  expect(mockEvent).toHaveBeenCalled();
});

// Mount render, include sub-components

it('renders the inner icon component', () => {
  const wrapper = mount(<ControlIcon icon="deploy" />);
  expect(wrapper.find('.element-icon')).toHaveLength(1);
});

// Snapshot testing

it('renders the button correctly when multiple props are set', () => {
  const wrapper = shallow(
    <ControlIcon icon="deploy-small" kind="secondary" disabled onClick={jest.fn} />,
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
