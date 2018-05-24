import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Heading from '../components/Heading';

it('renders correct sizes', () => {
  [...Array(10).keys()].forEach(size => {
    const wrapper = shallow(<Heading size={size}> Text </Heading>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
