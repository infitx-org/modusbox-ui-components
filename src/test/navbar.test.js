import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import NavbarWrapper from '../views/All/ComponentNavbar';
import Navbar from '../components/Navbar';

it('renders Navbar', () => {
  const wrapper = mount(<Navbar />);
  expect(wrapper.find('.Navbar')).toHaveLength(1);
  expect(wrapper.find('.Navbar__left')).toHaveLength(1);
  expect(wrapper.find('.Navbar__right')).toHaveLength(1);
});
