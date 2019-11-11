import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import Spinner from '../components/Spinner';

it('renders the spinner', () => {
  const wrapper = shallow(<Spinner />);
  expect(wrapper.find('.element-spinner')).toBeTruthy();
});

it('renders the spinner elements with correct size', () => {
  [1, 2, 3, 10, 20, 30, 100, 200, 300].forEach(size => {
    const wrapper = shallow(<Spinner size={size} />);
    const svg = wrapper.find('svg');
    const style = wrapper.find('.element-spinner').prop('style');
    expect(svg.prop('height')).toBe(`${size}px`);
    expect(svg.prop('width')).toBe(`${size}px`);
    expect(style).toHaveProperty('width', `${size}px`);
    expect(style).toHaveProperty('height', `${size}px`);
  });
});

it('renders the spinner with color', () => {
  const wrapper = shallow(<Spinner color="#f00" />);
  expect(wrapper.find('path').prop('style')).toHaveProperty('stroke', '#f00');
});

it('renders the spinner centered to the parent container', () => {
  const wrapper = mount(
    <div style={{ height: '100px', width: '100px' }}>
      <Spinner size={20} center />
    </div>,
  );
  expect(wrapper.find('.center')).toHaveLength(1);
  const svg = wrapper.find('svg');
  expect(svg.prop('height')).toBe('20px');
  expect(svg.prop('width')).toBe('20px');
});

// Snapshot
it('renders the button correctly when multiple props are set', () => {
  const wrapper = shallow(<Spinner color="#ff0" size={30} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
