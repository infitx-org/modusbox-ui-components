import React from 'react';
import Checkbox from '../../../components/Checkbox';
import Icon from '../../../components/Icon';
import { Link } from '../../../components/DataList';

export const labels = ['a', 'b', 'c', 'd', 'e'];
export const generate = {
  a: value => value,
  b: value => value,
  c: value => ({ test: { value } }),
  d: value => value,
  e: value => value,
};
let idx = 0;
export const buildRow = () =>
  labels.reduce(
    (prev, key) => ({
      ...prev,
      // eslint-disable-next-line
      [key]: generate[key](idx++),
    }),
    {},
  );

export const list = new Array(20).fill(0).map(buildRow);

export const containerStyle = {
  padding: '5px',
  display: 'flex',
  flex: '2 1 auto',
  flexDirection: 'column',
  minHeight: '0',
};

export const rowStyle = {
  padding: '2px',
  margin: '5px 0px',
  display: 'flex',
  flex: '0 0 auto',
  flexDirection: 'row',
  alignItems: 'center',
  background: '#F0F9F9',
};

export const getColumns = (counter = 1) => [
  {
    label: 'Double',
    key: 'a',
    // eslint-disable-next-line
    func: x => <Link>{x}</Link>,
    className: 'col-100px',
  },
  {
    label: 'Double',
    key: 'a',
    func: x => x * 2 * counter,
    className: 'col-100px',
  },
  {
    label: 'Test',
    key: 'a',
    func: x => <span>{x * Math.random()}</span>,
    className: 'col-100px',
  },
  {
    label: 'Zero Zero Zero Zero',
    key: 'a',
    func: () => new Array(25).fill(counter).join(' -  '),
  },
  {
    label: 'Square',
    key: 'b',
    func: x => x * x * counter,
  },
  {
    label: 'c',
    key: 'c.test.value',
  },
  {
    label: 'd',
    key: 'd',
    func: x => new Array(15).fill(x).join(''),
    // eslint-disable-next-line
    link: console.log,
  },
  {
    sortable: false,
    label: '',
    key: 'e',
    func: () => <Icon name="close-small" size={16} fill="#999" />,
    className: 'col-40px',
  },
  {
    sortable: false,
    label: '',
    key: 'e',
    func: () => <Checkbox checked={counter % 2 !== 0} />,
    className: 'col-40px',
  },
  {
    sortable: false,
    label: 'Counter',
    key: 'e',
    func: () => counter,
    className: 'col-40px',
  },
];