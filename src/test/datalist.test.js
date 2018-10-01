import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DataList from '../components/DataList';

const testColumns1 = [
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
const fromColumns = columns => (item, index) =>
  columns.reduce(
    (prev, column) => ({
      ...prev,
      [column.key]: (iterator += 1),
    }),
    {}
  );

const testList1 = new Array(100).fill(null).map(fromColumns(testColumns1));

const testList2 = [4, 5, 3, 1, 2].map(value => ({
    col: value
  }));
const testColumns2 = [{
  label: 'Sortable Column',
  key: 'col'
}];

it('renders the list', () => {
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} />);

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__rows').exists()).toBe(true);
  expect(wrapper.find('div.element-datalist__row')).toHaveLength(testList1.length);
});

it('renders the header', () => {
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} />);

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__header').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__header-cell')).toHaveLength(testColumns1.length);
});

it('renders the pending spinner when prop isPending is set', () => {
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} isPending />);

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__rows').exists()).toBe(false);
  expect(wrapper.find('.element-datalist__pending-box').exists()).toBe(true);
});

it('renders the error message when prop hasError is set', () => {
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} hasError />);

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__rows').exists()).toBe(false);
  expect(wrapper.find('.element-datalist__error-box').exists()).toBe(true);
});

it('renders the no-data message when the list is empty', () => {
  const wrapper = mount(<DataList list={[]} columns={testColumns1} />);

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist__rows').exists()).toBe(false);
  expect(wrapper.find('.element-datalist__nodata-box').exists()).toBe(true);
});

it('renders the correct transformed value described in the column configuration', () => {
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} />);

  const cellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell__content')
    .at(1)
    .text();
  const columnContent = testColumns1[1].func(testList1[0].column2).toString();

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
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} />);

  const link = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell__content')
    .at(0)
    .find('.element-datalist__link');
  const columnContent = testColumns1[1].func(testList1[0].column2).toString();

  expect(link.exists()).toBeTruthy();
});

it('renders the selected prop', () => {
  const wrapper = mount(
    <DataList list={testList1} columns={testColumns1} selected={item => item.column1 === 1} />
  );

  const hasSelectedClass = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .hasClass('element-datalist__row--selected');

  expect(hasSelectedClass).toBeTruthy();
});

it('triggers the onSelect even when clicking on a row', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} onSelect={mockEvent} />);

  wrapper
    .find('div.element-datalist__row')
    .at(0)
    .simulate('click');

  const firstItem = testList1[0];

  expect(mockEvent).toHaveBeenCalledWith(firstItem);
});

it('triggers the onUnselect even when clicking on a selected row', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <DataList
      list={testList1}
      columns={testColumns1}
      selected={item => item.column1 === 1}
      onUnselect={mockEvent}
    />
  );

  wrapper
    .find('div.element-datalist__row')
    .at(0)
    .simulate('click');

  const firstItem = testList1[0];

  expect(mockEvent).toHaveBeenCalledWith(firstItem);
});

it('renders and sorts by the prop sortColumn', () => {
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} sortColumn="Column2" />);
  
  const headerContent = wrapper
    .find('.element-datalist__header-cell--sorting')
    .text();

  const cellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell__content')
    .at(1)
    .text();

  const inputValue = testList1[0].column2;
  const columnFunc = testColumns1[1].func;
  const expectedCellContent = columnFunc(inputValue).toString();
  
  expect(headerContent).toBe('Column2');
  expect(cellContent).toBe(expectedCellContent);
});

it('renders and sorts desc by the prop sortAsc', () => {
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} sortColumn="Column2" sortAsc={false}/>);
  
  const cellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell__content')
    .at(1)
    .text();

  const inputValue = testList1[testList1.length - 1].column2;
  const columnFunc = testColumns1[1].func;
  const expectedCellContent = columnFunc(inputValue).toString();
  
  expect(cellContent).toBe(expectedCellContent);
});

it('Automatically sorts on the first sortable column if not specified otherwise', () => {
  const wrapper = mount(<DataList list={testList2} columns={testColumns2}/>);
  
  const previousSortingCell = wrapper
    .find('.element-datalist__header-cell--sorting').text();

  const cellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell__content')
    .at(0)
    .text();

  const unsortedInputValue = testList2[0].col.toString();
  const numericvalues = testList2.map(item => item.col);
  const expectedOutputValue = Math.min.apply(null, numericvalues).toString();
  
  expect(previousSortingCell).toBe('Sortable Column');
  expect(cellContent).not.toBe(unsortedInputValue);
  expect(cellContent).toBe(expectedOutputValue);
});

it('Triggers the sorting on the clicked column', () => {
  const wrapper = mount(<DataList list={testList2} columns={testColumns2}/>);  
  
  const prevSortingCell = wrapper
    .find('.element-datalist__header-cell--sorting').text();

  const prevCellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell__content')
    .at(0)
    .text();

  wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .simulate('click');

  const nextSortingCell = wrapper
    .find('.element-datalist__header-cell--sorting').text();

  const nextCellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell__content')
    .at(0)
    .text();
  
  expect(prevSortingCell).toBe('Sortable Column');
  expect(prevSortingCell).toEqual(nextSortingCell);
  expect(prevCellContent).not.toEqual(nextCellContent);

});

it('updates the cell content on list changing', () => {
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} />);
  
  const oldCellValue = wrapper
    .find('div.element-datalist__item-cell__content')
    .at(0)
    .text();

  const updatedList = testList1.map(item => ({
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
