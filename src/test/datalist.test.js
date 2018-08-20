import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DataList from '../components/DataList';

const columns = [
  {
    label: 'Column1',
    key: 'column1',
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
let iterator = 0;
const fromColumns = (item, index) => columns.reduce((prev, column) => ({
  ...prev,
  [column.key]: iterator += 1,
}), {});
  
const list = new Array(100).fill(null).map(fromColumns);

it('renders the list', () => {
  const wrapper = mount(
    <DataList list={list} columns={columns}/>    
  );

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__rows').exists()).toBe(true);
  expect(wrapper.find('div.element-datalist__row')).toHaveLength(list.length);  

});

it('renders the header', () => {
  const wrapper = mount(
    <DataList list={list} columns={columns}/>    
  );

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__header').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__header-cell')).toHaveLength(columns.length);  

});

it('renders the pending spinner when prop isPending is set', () => {
  const wrapper = mount(
    <DataList list={list} columns={columns} isPending />
  );

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__rows').exists()).toBe(false);
  expect(wrapper.find('.element-datalist__pending-box').exists()).toBe(true);

});

it('renders the error message when prop hasError is set', () => {
  const wrapper = mount(
    <DataList list={list} columns={columns} hasError />
  );

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__rows').exists()).toBe(false);
  expect(wrapper.find('.element-datalist__error-box').exists()).toBe(true);

});

it('renders the no-data message when the list is empty', () => {
  const wrapper = mount(
    <DataList list={[]} columns={columns} />
  );  

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__rows').exists()).toBe(false);
  expect(wrapper.find('.element-datalist__nodata-box').exists()).toBe(true);

});

it('renders the correct transformed value described in the column configuration', () => {
  const wrapper = mount(
    <DataList list={list} columns={columns} />
  );  

  const cellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell__content')
    .at(1)
    .text();
  const columnContent = columns[1].func(list[0].column2).toString();
  
  expect(cellContent).toBe(columnContent);  

});

it('sorts by the specified column label', () => {
  const wrapper = mount(
    <DataList list={list} columns={columns} sortColumn='Column3'/>
  );  
  expect(wrapper.find('.element-datalist__header-cell--sorting').text()).toBe('Column3');

});

it('updates the cell content on list changing', () => {
  const wrapper = mount(
    <DataList list={list} columns={columns}/>
  );  
  const oldCellValue = wrapper.find('div.element-datalist__item-cell__content').at(0).text();

  const updatedList = list.map(item => ({
    ...item,
    column1: item.column1 * 2
  }));
  wrapper.setProps({ list: updatedList });  

  const newCellValue = wrapper.find('div.element-datalist__item-cell__content').at(0).text();
  expect(oldCellValue).not.toBe(newCellValue);
  expect(newCellValue).not.toBe('4');

});