import React from 'react';
import Checkbox from '../../../components/Checkbox';
import Icon from '../../../components/Icon';
import { Link } from '../../../components/DataList';

let idx = 0;
export const buildRow = () => {
  const row = {
    col1: idx + 1,
    col2: idx + 2,
    col3: idx + 3,
    col4: idx + 4,
  };
  idx += 5;
  return row;
};
export const list = new Array(3).fill(0).map(buildRow);

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

export const getColumns = ({
  valueModifier = 1,
  col1 = true,
  col2 = true,
  col3 = true,
  col4 = true,
  linkColumn = false,
  textColumn = false,
  transformColumn = false,
  spanColumn = false,
  nestedColumn = false,
  linkFuncColumn = false,
  iconColumn = false,
  componentColumn = false,
} = {}) => {
  console.log({
    col1,
    col2,
    col3,
    col4,
    linkColumn,
    textColumn,
    transformColumn,
    spanColumn,
    nestedColumn,
    linkFuncColumn,
    iconColumn,
    componentColumn,
  });
  return [
    col1 && {
      label: 'Col 1',
      key: 'col1',
    },
    col2 && {
      label: 'Col 2',
      key: 'col2',
    },
    col3 && {
      label: 'Col 3',
      key: 'col3',
    },
    col4 && {
      label: 'Col 4',
      key: 'col4',
    },
    linkColumn && {
      label: 'Link',
      key: 'a',
      // eslint-disable-next-line
      func: x => <Link>{x}</Link>,
    },
    textColumn && {
      label: 'Regular',
      key: 'col1',
      // eslint-disable-next-line
      func: x => <Link>{x}</Link>,
    },
    transformColumn && {
      label: 'Transform',
      key: 'col1',
      func: x => x * 2 * valueModifier,
      className: 'col-100px',
    },
    spanColumn && {
      label: 'As a span',
      key: 'col1',
      func: x => <span>{x * Math.random()}</span>,
      className: 'col-100px',
    },
    nestedColumn && {
      label: 'Nested',
      key: 'c.test.value',
    },
    linkFuncColumn && {
      label: 'As a Link',
      key: 'col1',
      func: x => new Array(15).fill(x).join(''),
      // eslint-disable-next-line
      link: console.log,
    },
    iconColumn && {
      sortable: false,
      label: '',
      key: 'col1',
      func: () => <Icon name="close-small" size={16} fill="#999" />,
      className: 'col-40px',
    },
    componentColumn && {
      sortable: false,
      label: '',
      key: 'col1',
      func: () => <Checkbox checked={valueModifier % 2 !== 0} />,
      className: 'col-40px',
    },
  ].filter(item => item !== false && item !== undefined);
};
