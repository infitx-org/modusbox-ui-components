import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { Loader, Placeholder } from '../components/Common';
import Spinner from '../components/Spinner';
import { iconSizes } from '../components/Icon';

describe('The Loader', () => {

  it('renders the spinner', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.find(Spinner).exists()).toBeTruthy();
  });

  it('renders the large, medium, small sizes', () => {
    const sizes = {
      large: 'l',
      medium: 'm',
      small: 's',
    };
    Object.entries(sizes).forEach(([, size]) => {
      const iconSize = iconSizes[size];
      const wrapper = shallow(<Loader size={size} />);
      const spinner = wrapper.find(Spinner);
      expect(spinner.prop('size')).toEqual(iconSize);
    });
  });

  it('renders the loader correctly when multiple props are set', () => {
    const wrapper = shallow(<Loader size='m' />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

});

describe('The Placeholder', () => {

  it('renders the placeholder', () => {
    const wrapper = shallow(<Placeholder />);
    expect(wrapper.is('label')).toEqual(true);
  });

  it('renders the label prop', () => {
    const wrapper = shallow(<Placeholder label='foo' />);
    const label = wrapper.find('label');
    expect(label.text()).toEqual('foo');
  });

  it('renders the large, medium, small sizes', () => {
    const sizes = {
      large: 'l',
      medium: 'm',
      small: 's',
    };
    Object.entries(sizes).forEach(([name, size]) => {
      const wrapper = shallow(<Placeholder size={size} />);
      const label = wrapper.find('label');
      const classname = `mb-input__placeholder--${name}`;
      expect(label.hasClass(classname)).toBe(true);
    });
  });

  it('renders the large size active sizes', () => {
    const sizes = {
      large: 'l',
      medium: 'm',
      small: 's',
    };
    Object.entries(sizes).forEach(([name, size]) => {
      const wrapper = shallow(<Placeholder active size={size} />);
      const label = wrapper.find('label');
      const classname = `mb-input__placeholder--active-${name}`;
      expect(label.hasClass(classname)).toBe(true);
    });
  });

  it('renders the default large size active status when size is not specified', () => {    
    const wrapper = shallow(<Placeholder active />);
    const label = wrapper.find('label');
    expect(label.hasClass('mb-input__placeholder--active-large')).toEqual(true);
  });

  it('renders the placeholder correctly when multiple props are set', () => {
  const wrapper = shallow(<Placeholder label='foo' active size='m' />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

});
