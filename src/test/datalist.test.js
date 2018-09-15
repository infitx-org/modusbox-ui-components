import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DataList from '../components/DataList';

const columns = [
  {
    label: 'Column1',
    key: 'column1',
    sortable: false,
    link: console.log,
  },
  {
    label: 'Column2',
    key: 'column2',
    func: value => value * 2,
  },
  {
    label: 'Column3',
    key: 'column3',
    func: value => <div>{value}</div>,
  },
  {
    label: 'Column4',
    key: 'column4',
  },
];
let iterator = 0;
const fromColumns = (item, index) =>
  columns.reduce(
    (prev, column) => ({
      ...prev,
      [column.key]: (iterator += 1),
    }),
    {}
  );

const list = new Array(100).fill(null).map(fromColumns);

it('renders the list', () => {
  const wrapper = mount(<DataList list={list} columns={columns} />);

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__rows').exists()).toBe(true);
  expect(wrapper.find('div.element-datalist__row')).toHaveLength(list.length);
});

it('renders the header', () => {
  const wrapper = mount(<DataList list={list} columns={columns} />);

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__header').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__header-cell')).toHaveLength(columns.length);
});

it('renders the pending spinner when prop isPending is set', () => {
  const wrapper = mount(<DataList list={list} columns={columns} isPending />);

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__rows').exists()).toBe(false);
  expect(wrapper.find('.element-datalist__pending-box').exists()).toBe(true);
});

it('renders the error message when prop hasError is set', () => {
  const wrapper = mount(<DataList list={list} columns={columns} hasError />);

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__rows').exists()).toBe(false);
  expect(wrapper.find('.element-datalist__error-box').exists()).toBe(true);
});

it('renders the no-data message when the list is empty', () => {
  const wrapper = mount(<DataList list={[]} columns={columns} />);

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__rows').exists()).toBe(false);
  expect(wrapper.find('.element-datalist__nodata-box').exists()).toBe(true);
});

it('renders the correct transformed value described in the column configuration', () => {
  const wrapper = mount(<DataList list={list} columns={columns} />);

  const cellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell__content')
    .at(1)
    .text();
  const columnContent = columns[1].func(list[0].column2).toString();

  expect(cellContent).toBe(columnContent);
});

it('renders the nested object property as described in the column configuration', () => {
  const list = [{ field: { nested: { value: 'nested-value' } } }];
  const columns = [{ label: 'nested', key: 'field.nested.value' }];
  const wrapper = mount(<DataList list={list} columns={columns} />);

  const cellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell__content')
    .at(0)
    .text();

  const columnContent = list[0].field.nested.value;
  expect(cellContent).toBe(columnContent);
});

it('renders the link correctly', () => {
  const wrapper = mount(<DataList list={list} columns={columns} />);

  const link = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell__content')
    .at(0)
    .find('.element-datalist__link');
  const columnContent = columns[1].func(list[0].column2).toString();

  expect(link.exists()).toBeTruthy();
});

it('renders the selected prop', () => {
  const wrapper = mount(
    <DataList list={list} columns={columns} selected={item => item.column1 === 1} />
  );

  const hasSelectedClass = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .hasClass('element-datalist__row--selected');

  expect(hasSelectedClass).toBeTruthy();
});

it('triggers the onSelect even when clicking on a row', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<DataList list={list} columns={columns} onSelect={mockEvent} />);

  wrapper
    .find('div.element-datalist__row')
    .at(0)
    .simulate('click');

  const firstItem = list[0];

  expect(mockEvent).toHaveBeenCalledWith(firstItem);
});

it('triggers the onUnselect even when clicking on a selected row', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <DataList
      list={list}
      columns={columns}
      selected={item => item.column1 === 1}
      onUnselect={mockEvent}
    />
  );

  wrapper
    .find('div.element-datalist__row')
    .at(0)
    .simulate('click');

  const firstItem = list[0];

  expect(mockEvent).toHaveBeenCalledWith(firstItem);
});

it('sorts by the specified column label', () => {
  const wrapper = mount(<DataList list={list} columns={columns} sortColumn="Column3" />);
  expect(wrapper.find('.element-datalist__header-cell--sorting').text()).toBe('Column3');
});

it('updates the cell content on list changing', () => {
  const wrapper = mount(<DataList list={list} columns={columns} />);
  const oldCellValue = wrapper
    .find('div.element-datalist__item-cell__content')
    .at(0)
    .text();

  const updatedList = list.map(item => ({
    ...item,
    column1: item.column1 * 2,
  }));
  wrapper.setProps({ list: updatedList });

  const newCellValue = wrapper
    .find('div.element-datalist__item-cell__content')
    .at(0)
    .text();
  expect(oldCellValue).not.toBe(newCellValue);
  expect(newCellValue).not.toBe('4');
});
