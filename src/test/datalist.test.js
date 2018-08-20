import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DataList from '../components/DataList';

const columns = [
  {
    label: 'Column1',
    key: 'column1'
    sortable: false,
  },
  {
    label: 'Column2',
    key: 'column2',
    func: value => value * 2
  },
  {
    label: 'Column3',
    key: 'column3',
    func: value => <div>{value}</div>
  },
  {
    label: 'Column4',
    key: 'column4',    
  },

]
const list = 
it('renders the list', () => {
  const wrapper = shallow(<Button label="Test-Button" />);

});