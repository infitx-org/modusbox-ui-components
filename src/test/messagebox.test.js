import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import MessageBox from '../components/MessageBox';
import Icon from '../components/Icon';

// Shallow render, no sub-components ( still available children html)
it('renders the component', () => {
  const wrapper = shallow(<MessageBox message="test message" icon="deploy-small" />);
  expect(wrapper.find('div.el-message-box').exists()).toBe(true);
  expect(wrapper.find(Icon).exists()).toBe(true);
});

it('renders the messages', () => {
  const wrapper = shallow(<MessageBox message="test message" icon="deploy-small" />);
  expect(wrapper.find('.el-message-box__messages')).toHaveLength(1);
  expect(wrapper.find('.el-message-box__messages').text()).toBe('test message');
});


it('renders the active prop', () => {
  const wrapper = shallow(<MessageBox message="test message" icon="deploy-small" active />);
  expect(wrapper.find('div.el-message-box').hasClass('el-message-box--active')).toBe(true);
});

it('renders the center prop', () => {
  const wrapper = shallow(<MessageBox message="test message" icon="deploy-small" center />);
  expect(wrapper.find('div.el-message-box').hasClass('el-message-box--centered')).toBe(true);
});

it('renders the icon', () => {
  const wrapper = shallow(<MessageBox message="test message" icon="deploy" />);
  expect(wrapper.find('.el-message-box__icon')).toHaveLength(1);
  expect(wrapper.find(Icon)).toHaveLength(1);
});

it('renders the icon with override fill prop', () => {
  const wrapper = shallow(<MessageBox message="test message" icon="deploy" fill="#000"/>);
  expect(wrapper.find(Icon).prop('fill')).toBe('#000');
});

it('applies the prop fill', () => {
  const wrapper = shallow(<MessageBox message="test message" icon="deploy" fill="#fff" />);
  expect(wrapper.find(Icon).prop('fill')).toBe('#fff');
});

it('applies the prop className', () => {
  const wrapper = shallow(<MessageBox message="test message" icon="deploy" className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<MessageBox message="test message" icon="deploy" id="testMessageBoxId" />);
  expect(wrapper.find('#testMessageBoxId')).toHaveLength(1);
  expect(wrapper.find('div.el-message-box').prop('id')).toBe('testMessageBoxId');
});

it('renders the default correct kind', () => {
  const wrapper = shallow(<MessageBox message="test message" icon="deploy" />);
  expect(wrapper.find('div.el-message-box').hasClass('el-message-box--default')).toBe(true);
});

it('renders all the kinds', () => {
  ['default', 'primary', 'secondary', 'tertiary', 'danger', 'warning', 'dark', 'light'].forEach(
    kind => {
      const wrapper = shallow(<MessageBox message="test message" icon="deploy" kind={kind} />);
      expect(wrapper.find('div.el-message-box').hasClass(`el-message-box--${kind}`)).toBe(true);
    },
  );
});

// Mount render, include sub-components
it('renders the inner icon component', () => {
  const wrapper = mount(<MessageBox message="test message" icon="deploy" />);
  expect(wrapper.find('.el-icon')).toHaveLength(1);
});

// Snapshot testing
it('renders the button correctly when multiple props are set', () => {
  const wrapper = shallow(<MessageBox message="test message" icon="deploy-small" kind="secondary" disabled onClick={jest.fn} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
