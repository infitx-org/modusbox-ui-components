import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import Pill from '../components/Pill';
import Icon from '../components/Icon';
import Tooltip from '../components/Tooltip';

// Shallow render, no sub-components ( still available children html)
it('renders the component', () => {
  const wrapper = shallow(<Pill icon="deploy-small" />);
  expect(wrapper.find('div.el-pill').exists()).toBe(true);
  expect(wrapper.find(Icon).exists()).toBe(true);
});

it('renders the label', () => {
  const wrapper = shallow(<Pill icon="deploy-small" label="Hello!" />);
  expect(wrapper.find('.el-pill__label')).toHaveLength(1);
  expect(wrapper.find('.el-pill__label').text()).toBe('Hello!');
});

it('renders the tooltip', () => {
  const wrapper = shallow(<Pill icon="deploy-small" tooltip="I am the tooltip" />);
  expect(wrapper.find(Tooltip)).toHaveLength(1);
});

it('renders the active state', () => {
  const wrapper = shallow(<Pill icon="deploy-small" active />);
  expect(wrapper.find('div.el-pill').hasClass('el-pill--active')).toBe(true);
});

it('renders the icon', () => {
  const wrapper = shallow(<Pill icon="deploy" />);
  expect(wrapper.find('.el-pill__icon')).toHaveLength(1);
  expect(wrapper.find(Icon)).toHaveLength(1);
});

it('applies the prop fill', () => {
  const wrapper = shallow(<Pill icon="deploy" fill="#fff" />);
  expect(wrapper.find(Icon).prop('fill')).toBe('#fff');
});

it('applies the prop className', () => {
  const wrapper = shallow(<Pill icon="deploy" className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<Pill icon="deploy" id="testPillId" />);
  expect(wrapper.find('#testPillId')).toHaveLength(1);
  expect(wrapper.find('div.el-pill').prop('id')).toBe('testPillId');
});

it('renders the default correct kind', () => {
  const wrapper = shallow(<Pill icon="deploy" />);
  expect(wrapper.find('div.el-pill').hasClass('el-pill--default')).toBe(true);
});

it('renders all the kinds', () => {
  ['default', 'primary', 'secondary', 'tertiary', 'danger', 'warning', 'dark', 'light'].forEach(kind => {
    const wrapper = shallow(<Pill icon="deploy" kind={kind} />);
    expect(wrapper.find('div.el-pill').hasClass(`el-pill--${kind}`)).toBe(true);
  });
});


// Mount render, include sub-components

it('renders the inner icon component', () => {
  const wrapper = mount(<Pill icon="deploy" />);
  expect(wrapper.find('.el-icon')).toHaveLength(1);
});

// Snapshot testing

it('renders the button correctly when multiple props are set', () => {
  const wrapper = shallow(
    <Pill icon="deploy-small" kind="secondary" disabled onClick={jest.fn} />,
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
