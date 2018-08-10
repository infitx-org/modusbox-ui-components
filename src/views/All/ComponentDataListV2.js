/* eslint no-console: "off" */
import React from 'react';

import DataList from '../../components/DataListV2';
import Icon from '../../components/Icon';

const columns = ['a', 'b', 'c', 'd', 'e'];
const list = new Array(100).fill(0).map((row, rowIdx) => columns.reduce((prev, curr, colIdx) => {
  // eslint-disable-next-line max-len
  const value = colIdx + rowIdx * columns.length;
  return {
    ...prev,
    [`${curr}`]: value,
  };
}, {}));

const columns1 = [
  {
    label: 'Double',
    key: 'a',
    func: x => x * 2,
    sortable: true,
  },
  {
    label: 'Square',
    key: 'b',
    func: x => x * x,
  },
  {
    label: 'c',
    key: 'c',
    func: x => <span>{x}</span>,
  },
  {
    label: 'd',
    key: 'd',
    func: x => new Array(20).fill(x).join(''),
  },
  {
    label: 'e',
    key: 'e',
    func: () => <Icon name="arrow" size={20} />,
  },
];

const TestDataList = () => (
  <div
    style={{
      padding: '10px',
      margin: '5px 0px',
      border: '1px solid #ccc',
      display: 'flex',
      flex: '2 1 auto',
    }}
  >

    <DataList
      columns={columns1}
      list={list}
      sortColumn="Square"
      sortAsc={false}
    />
  </div>
);

export default TestDataList;
