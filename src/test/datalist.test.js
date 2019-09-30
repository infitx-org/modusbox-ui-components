import React from 'react';
import { mount } from 'enzyme';

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
const buildRow = columns => () =>
  columns.reduce(
    /* eslint-disable no-return-assign */
    (prev, column) => ({
      ...prev,
      [column.key]: (iterator += 1),
    }),
    {},
  );

const testList1 = new Array(100).fill(null).map(buildRow(testColumns1));

const testList2 = [4, 5, 3, 1, 2].map(value => ({
  col: value,
}));
const testColumns2 = [
  {
    label: 'Sortable Column',
    key: 'col',
  },
];

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

it('renders as flex when specified', () => {
  const wrapper = mount(<DataList flex list={[]} columns={testColumns1} />);

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist--flexible').exists()).toBe(true);
});

it('does not render as flex when specified', () => {
  const wrapper = mount(<DataList flex={false} list={[]} columns={testColumns1} />);

  expect(wrapper.find('.element-datalist').exists()).toBe(true);
  expect(wrapper.find('.element-datalist--flexible').exists()).toBe(false);
});

it('renders the correct transformed value described in the column configuration', () => {
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} />);

  const cellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell')
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
    .find('.element-datalist__item-cell')
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
    .find('.element-datalist__item-cell')
    .at(0)
    .find('.element-datalist__link');

  expect(link.exists()).toBeTruthy();
});

it('renders the selected prop when an a function is passed', () => {
  const selectedFn = item => item.column1 === 1
  const wrapper = mount(
    <DataList list={testList1} columns={testColumns1} selected={selectedFn} />,
  );

  const hasSelectedClass = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .hasClass('element-datalist__row--selected');

  const allSelectedRows = wrapper
    .find('div.element-datalist__row.element-datalist__row--selected');

  expect(hasSelectedClass).toBeTruthy();
  expect(allSelectedRows).toHaveLength(1);
});

it('renders the selected prop when an array is passed', () => {
  const selected = [
    testList1[0],
    testList1[1]
  ];
  const wrapper = mount(
    <DataList list={testList1} columns={testColumns1} selected={selected} />,
  );

  const row1 = wrapper
    .find('div.element-datalist__row')
    .at(0);

  const row2 = wrapper
    .find('div.element-datalist__row')
    .at(1);

  const row3 = wrapper
    .find('div.element-datalist__row')
    .at(2);
    

  expect(row1.hasClass('element-datalist__row--selected')).toBe(true);
  expect(row2.hasClass('element-datalist__row--selected')).toBe(true);
  expect(row3.hasClass('element-datalist__row--selected')).toBe(false);
});

it('renders the selected prop when a single item is passed', () => {
  const selected = testList1[0];
  const wrapper = mount(
    <DataList list={testList1} columns={testColumns1} selected={selected} />,
  );

  const row1 = wrapper
    .find('div.element-datalist__row')
    .at(0);

  const row2 = wrapper
    .find('div.element-datalist__row')
    .at(1);

  expect(row1.hasClass('element-datalist__row--selected')).toBe(true);
  expect(row2.hasClass('element-datalist__row--selected')).toBe(false);
});

it('updates the cell content on list changing', () => {
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} />);

  const oldCellValue = wrapper
    .find('div.element-datalist__item-cell')
    .at(0)
    .text();

  const updatedList = testList1.map(item => ({
    ...item,
    column1: item.column1 * 2,
  }));
  wrapper.setProps({ list: updatedList });

  const newCellValue = wrapper
    .find('div.element-datalist__item-cell')
    .at(0)
    .text();
  expect(oldCellValue).not.toBe(newCellValue);
  expect(newCellValue).not.toBe('4');
});

it('renders and sorts by the prop sortColumn', () => {
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} sortColumn="Column2" />);

  const headerContent = wrapper.find('.element-datalist__header-cell--sorting').text();

  const cellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell')
    .at(1)
    .text();

  const inputValue = testList1[0].column2;
  const columnFunc = testColumns1[1].func;
  const expectedCellContent = columnFunc(inputValue).toString();

  expect(headerContent).toBe('Column2');
  expect(cellContent).toBe(expectedCellContent);
});

it('renders and sorts desc by the prop sortAsc', () => {
  const wrapper = mount(
    <DataList list={testList1} columns={testColumns1} sortColumn="Column2" sortAsc={false} />,
  );

  const cellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell')
    .at(1)
    .text();

  const inputValue = testList1[testList1.length - 1].column2;
  const columnFunc = testColumns1[1].func;
  const expectedCellContent = columnFunc(inputValue).toString();

  expect(cellContent).toBe(expectedCellContent);
});

it('automatically sorts on the first sortable column if not specified otherwise', () => {
  const wrapper = mount(<DataList list={testList2} columns={testColumns2} />);

  const previousSortingCell = wrapper.find('.element-datalist__header-cell--sorting').text();

  const cellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell')
    .at(0)
    .text();

  const unsortedInputValue = testList2[0].col.toString();
  const numericvalues = testList2.map(item => item.col);
  const expectedOutputValue = Math.min.apply(null, numericvalues).toString();

  expect(previousSortingCell).toBe('Sortable Column');
  expect(cellContent).not.toBe(unsortedInputValue);
  expect(cellContent).toBe(expectedOutputValue);
});

it('cannot sort on a column when configured as non sortable', () => {
  const columns = [
    {
      label: '',
      key: 'col',
      sortable: false,
    },
  ];
  const wrapper = mount(<DataList list={testList2} columns={columns} />);

  const headerCell = wrapper.find('.element-datalist__header-cell').at(0);

  expect(headerCell.hasClass('element-datalist__header-cell--sortable')).toBeFalsy();
});

it('sorts the list by the column of the clicked header cell', () => {
  const wrapper = mount(<DataList list={testList2} columns={testColumns2} />);

  const prevSortingCell = wrapper.find('.element-datalist__header-cell--sorting').text();

  const prevCellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell')
    .at(0)
    .text();

  wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .simulate('click');

  const nextSortingCell = wrapper.find('.element-datalist__header-cell--sorting').text();

  const nextCellContent = wrapper
    .find('div.element-datalist__row')
    .at(0)
    .find('.element-datalist__item-cell')
    .at(0)
    .text();

  expect(prevSortingCell).toBe('Sortable Column');
  expect(prevSortingCell).toEqual(nextSortingCell);
  expect(prevCellContent).not.toEqual(nextCellContent);
});

it('cannot search on a column without label', () => {
  const columns = [
    {
      label: '',
      key: 'col',
    },
  ];
  const wrapper = mount(<DataList list={testList2} columns={columns} />);

  const searchIcon = wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('.element-datalist__header-cell__search-icon');

  expect(searchIcon.exists()).toBeFalsy();
});

it('cannot search on a column when configued as non searchable', () => {
  const columns = [
    {
      label: 'Non searchable column',
      key: 'col',
      searchable: false,
    },
  ];

  const wrapper = mount(<DataList list={testList2} columns={columns} />);

  const searchIcon = wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('.element-datalist__header-cell__search-icon');

  expect(searchIcon.exists()).toBeFalsy();
});

it('finds the filter input when clicking on a filterable column', () => {
  const wrapper = mount(<DataList list={testList2} columns={testColumns2} />);

  wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('.element-datalist__header-cell__search-icon')
    .at(0)
    .simulate('click');

  const updatedHeaderCell = wrapper.find('.element-datalist__header-cell').at(0);
  const hasFilterClass = updatedHeaderCell.hasClass('element-datalist__header-cell--filtering');

  const textInput = updatedHeaderCell.find('input[type="text"]');

  expect(hasFilterClass).toBeTruthy();
  expect(textInput.exists()).toBeTruthy();
});

it('filters the list when setting a filter', () => {
  const wrapper = mount(<DataList list={testList2} columns={testColumns2} />);

  const filterValue = '1';
  const initialRowsCount = wrapper.find(
    'div.element-datalist__row:not(.element-datalist__row--filtered)',
  ).length;

  wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('.element-datalist__header-cell__search-icon')
    .at(0)
    .simulate('click');

  wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('input[type="text"]')
    .simulate('change', { target: { value: filterValue } });

  const updatedRows = wrapper.find(
    'div.element-datalist__row:not(.element-datalist__row--filtered)',
  );
  const firstCellContent = updatedRows
    .at(0)
    .find('div.element-datalist__item-cell')
    .at(0)
    .text();

  const updatedRowsCount = updatedRows.length;

  expect(firstCellContent.includes(filterValue)).toBeTruthy();
  expect(initialRowsCount).not.toEqual(updatedRowsCount);
  expect(updatedRowsCount).toEqual(1);
});

it('filters the list on muliple columns when multiple filters are set a filter', () => {
  const valueColumn1 = 'foo';
  const valueColumn2 = 'bar';

  const list = [
    {
      col1: valueColumn1,
      col2: valueColumn2,
    },
    {
      col1: 'xyz',
      col2: 'xyz',
    },
  ];
  const columns = [
    {
      label: 'col1',
      key: 'col1',
    },
    {
      label: 'col2',
      key: 'col2',
    },
  ];

  const wrapper = mount(<DataList list={list} columns={columns} />);

  const initialRowsCount = wrapper.find(
    'div.element-datalist__row:not(.element-datalist__row--filtered)',
  ).length;

  wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('.element-datalist__header-cell__search-icon')
    .at(0)
    .simulate('click');

  wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('input[type="text"]')
    .simulate('change', { target: { value: valueColumn1 } });

  wrapper
    .find('.element-datalist__header-cell')
    .at(1)
    .find('.element-datalist__header-cell__search-icon')
    .at(0)
    .simulate('click');

  wrapper
    .find('.element-datalist__header-cell')
    .at(1)
    .find('input[type="text"]')
    .simulate('change', { target: { value: valueColumn2 } });

  const updatedRows = wrapper.find(
    'div.element-datalist__row:not(.element-datalist__row--filtered)',
  );

  const updatedRowsCount = updatedRows.length;

  expect(initialRowsCount).not.toEqual(updatedRowsCount);
  expect(updatedRowsCount).toEqual(1);
});

it('renders the checkboxes when onCheck prop is passed', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<DataList list={testList1} columns={testColumns1} onCheck={mockEvent} />);

  const checkboxHeaderCell = wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('Checkbox');

  wrapper.find('.element-datalist__row').forEach(row => {
    const rowCheckbox = row
      .find('div.element-datalist__item-cell')
      .at(0)
      .find('Checkbox');
    expect(rowCheckbox.exists()).toBe(true);
  });

  expect(checkboxHeaderCell.exists()).toBe(true);
});

it('renders the checkboxes checked when onCheck prop is passed', () => {
  const mockEvent = jest.fn();
  const checked = () => true;
  const wrapper = mount(
    <DataList list={testList1} columns={testColumns1} onCheck={mockEvent} checked={checked} />,
  );

  const checkboxHeaderCell = wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('Checkbox');

  wrapper.find('.element-datalist__row').forEach(row => {
    const rowCheckbox = row
      .find('div.element-datalist__item-cell')
      .at(0)
      .find('Checkbox');
    expect(rowCheckbox.prop('checked')).toBe(true);
  });

  expect(checkboxHeaderCell.prop('checked')).toBe(true);
});

it('renders the checkboxes checked when passing the checked prop as an array', () => {
  const mockEvent = jest.fn();
  const checked = [testList1[0], testList1[1]];
  const wrapper = mount(
    <DataList list={testList1} columns={testColumns1} onCheck={mockEvent} checked={checked} />,
  );

  const checkboxHeaderCell = wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox1 = wrapper
    .find('.element-datalist__row')
    .at(0)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox2 = wrapper
    .find('.element-datalist__row')
    .at(1)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox3 = wrapper
    .find('.element-datalist__row')
    .at(2)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  expect(checkboxHeaderCell.prop('checked')).toBe(false);
  expect(rowCheckbox1.prop('checked')).toBe(true);
  expect(rowCheckbox2.prop('checked')).toBe(true);
  expect(rowCheckbox3.prop('checked')).toBe(false);
});

it('renders the checkboxes checked after a list change', () => {
  const mockEvent = jest.fn();
  const checked = [testList1[0], testList1[1]];
  const wrapper = mount(
    <DataList list={testList1} columns={testColumns1} onCheck={mockEvent} checked={checked} />,
  );
  const newList = [...testList1, buildRow(testColumns1)()];

  wrapper.setProps({ list: newList });

  const checkboxHeaderCell = wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox1 = wrapper
    .find('.element-datalist__row')
    .at(0)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox2 = wrapper
    .find('.element-datalist__row')
    .at(1)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox3 = wrapper
    .find('.element-datalist__row')
    .at(2)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  expect(checkboxHeaderCell.prop('checked')).toBe(false);
  expect(rowCheckbox1.prop('checked')).toBe(true);
  expect(rowCheckbox2.prop('checked')).toBe(true);
  expect(rowCheckbox3.prop('checked')).toBe(false);
});

it('renders the checkboxes checked after columns change', () => {
  const mockEvent = jest.fn();
  const checked = [testList1[0], testList1[1]];
  const wrapper = mount(
    <DataList list={testList1} columns={testColumns1} onCheck={mockEvent} checked={checked} />,
  );
  const newColumns = [
    ...testColumns1,
    {
      label: 'Column5',
      key: 'column5',
    },
  ];
  wrapper.setProps({ columns: newColumns });

  const checkboxHeaderCell = wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox1 = wrapper
    .find('.element-datalist__row')
    .at(0)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox2 = wrapper
    .find('.element-datalist__row')
    .at(1)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox3 = wrapper
    .find('.element-datalist__row')
    .at(2)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  expect(checkboxHeaderCell.prop('checked')).toBe(false);
  expect(rowCheckbox1.prop('checked')).toBe(true);
  expect(rowCheckbox2.prop('checked')).toBe(true);
  expect(rowCheckbox3.prop('checked')).toBe(false);
});

it('disables the row checkbox bases on the function passed to the checkable prop', () => {
  const checkableFn = item => item.column1 !== 1;
  const mockEvent = jest.fn();
  const wrapper = mount(
    <DataList
      list={testList1}
      columns={testColumns1}
      onCheck={mockEvent}
      checked={[]}
      checkable={checkableFn}
    />,
  );

  const checkboxHeaderCell = wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox1 = wrapper
    .find('.element-datalist__row')
    .at(0)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox2 = wrapper
    .find('.element-datalist__row')
    .at(1)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox3 = wrapper
    .find('.element-datalist__row')
    .at(2)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  expect(checkboxHeaderCell.exists()).toBe(true);
  expect(rowCheckbox1.exists()).toBe(false);
  expect(rowCheckbox2.exists()).toBe(true);
  expect(rowCheckbox3.exists()).toBe(true);
});

it('disables the header checkbox when no items can be checked', () => {
  const mockEvent = jest.fn();
  const checked = [testList1[0], testList1[1]];
  const wrapper = mount(
    <DataList
      list={testList1}
      columns={testColumns1}
      onCheck={mockEvent}
      checked={checked}
      checkable={() => false}
    />,
  );

  const checkboxHeaderCell = wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox1 = wrapper
    .find('.element-datalist__row')
    .at(0)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox2 = wrapper
    .find('.element-datalist__row')
    .at(1)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  const rowCheckbox3 = wrapper
    .find('.element-datalist__row')
    .at(2)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox');

  expect(checkboxHeaderCell.prop('checked')).toBe(false);
  expect(checkboxHeaderCell.prop('disabled')).toBe(true);
  expect(rowCheckbox1.exists()).toBe(false);
  expect(rowCheckbox2.exists()).toBe(false);
  expect(rowCheckbox3.exists()).toBe(false);
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
    />,
  );

  wrapper
    .find('div.element-datalist__row')
    .at(0)
    .simulate('click');

  const firstItem = testList1[0];

  expect(mockEvent).toHaveBeenCalledWith(firstItem);
});

it('triggers the onCheck function when clicking a checkbox', () => {
  const mockEvent = jest.fn();
  const checked = () => false;
  const wrapper = mount(
    <DataList list={testList1} columns={testColumns1} onCheck={mockEvent} checked={checked} />,
  );

  wrapper
    .find('.element-datalist__row')
    .at(0)
    .find('div.element-datalist__item-cell')
    .at(0)
    .find('Checkbox')
    .find('label')
    .simulate('click');

  expect(mockEvent).toHaveBeenCalledWith([testList1[0]]);
});

it('triggers the onCheck function with all items when clicking the header checkbox', () => {
  const mockEvent = jest.fn();
  const checked = () => false;
  const wrapper = mount(
    <DataList list={testList1} columns={testColumns1} onCheck={mockEvent} checked={checked} />,
  );

  wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('Checkbox')
    .find('label')
    .simulate('click');

  expect(mockEvent).toHaveBeenCalledWith(testList1);
});

it('triggers the onCheck function with no items when clicking the header checkbox twice', () => {
  const mockEvent = jest.fn();
  const checked = () => false;
  const wrapper = mount(
    <DataList list={testList1} columns={testColumns1} onCheck={mockEvent} checked={checked} />,
  );

  wrapper
    .find('.element-datalist__header-cell')
    .at(0)
    .find('Checkbox')
    .find('label')
    .simulate('click')
    .simulate('click');

  expect(mockEvent).toHaveBeenCalledWith([]);
});

/*it('renders the list correctly when multiple props are set', () => {
  const mockEvent = () => false;
  const checked = () => false;
  const wrapper = shallow(
    <DataList
      list={testList1}
      columns={testColumns1}
      onCheck={mockEvent}
      checked={checked}
      sortColumn="Column2"
      sortAsc={false}
      selected={item => item.column1 === 1}
      onUnselect={mockEvent}
    />,
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
*/
